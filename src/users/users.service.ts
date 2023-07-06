import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterInput } from '../auth/dto/register.input';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // create a new user and save it to the database
  async create(registerInput: RegisterInput) {
    const verificationCode = this.jwtService.sign(
      { email: registerInput.email },
      {
        secret: this.configService.get('VERIFICATION_TOKEN_SECRET'),
        expiresIn: 3600,
      },
    );

    return await this.userRepository.save(
      this.userRepository.create({ ...registerInput, verificationCode }),
    );
  }

  // search users by firstName or lastName (searchbar)
  async searchUsersByName(searchTerm: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .where(
        `CONCAT(user.firstName, ' ', user.lastName) ILIKE :searchTerm OR CONCAT(user.lastName, ' ', user.firstName) ILIKE :searchTerm`,
        {
          searchTerm: `%${searchTerm}%`,
        },
      )
      .getMany();
  }

  // find all users
  findAll() {
    return this.userRepository.find();
  }

  // find a user by email
  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  // find a user by id
  findOneById(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  // update a user
  async update(id: string, updateUserInput: UpdateUserInput) {
    const result = await this.userRepository.update(id, updateUserInput);
    return result.affected === 1 ? 'User updated' : 'User not found';
  }

  // set a user as verified
  setUserVerified(userId: string) {
    return this.userRepository.update(userId, {
      isVerified: true,
      verificationCode: null,
    });
  }

  // remove a user
  async remove(id: string) {
    const result = await this.userRepository.delete(id);
    return result.affected === 1 ? 'User deleted' : 'User not found';
  }
}

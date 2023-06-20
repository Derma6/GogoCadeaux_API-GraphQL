import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterInput } from '../auth/dto/register.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>, // private jwtService: JwtService,
  ) {}
  create(registerInput: RegisterInput) {
    return this.userRepository.save(
      this.userRepository.create({ ...registerInput }),
    );
  }

  findAll() {
    return this.userRepository.find();
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  findOneById(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  setUserVerified(userId: string) {
    return this.userRepository.update(userId, {
      isVerified: true,
      verificationCode: null,
    });
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}

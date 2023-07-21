import { Inject, Injectable } from '@nestjs/common';
import { User } from '@infra/users/user.entity';
import { UserRepositoryInterface } from '@domain/users/user.repository.interface';
import { RegisterUserInput } from '@infra/auth/inputs/register-user.input';

@Injectable()
export class UsersService {
  constructor(
    @Inject('MyUserRepository')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async create(data: RegisterUserInput) {
    const user = new User();

    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;
    user.password = data.password;

    return this.userRepository.save(user);
  }

  async findOneById(id: string) {
    return this.userRepository.findOne(id);
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneByEmail(email);
  }

  async delete(id: string) {
    return this.userRepository.delete(id);
  }
}

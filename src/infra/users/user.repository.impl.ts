import { Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '@domain/users/user.repository.interface';
import { User } from '@infra/users/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepositoryImpl implements UserRepositoryInterface {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async update(id: string, data: Partial<User>): Promise<any> {
    return await this.userRepository.update(id, data);
  }

  async delete(id: string): Promise<any> {
    return await this.userRepository.delete(id);
  }
}

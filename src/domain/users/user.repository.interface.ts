import { User } from '@infra/users/user.entity';
import { DeleteResult } from 'typeorm';

export interface UserRepositoryInterface {
  save(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findOne(id: string): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
  update(id: string, data: Partial<User>): Promise<any>;
  delete(id: string): Promise<DeleteResult>;
}

import { List } from '@infra/lists/list.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserToList } from '@infra/lists/userToList.entity';
import { User } from '@infra/users/user.entity';

export interface ListRepositoryInterface {
  save(list: List, userToList: UserToList): Promise<List>;
  findAll(): Promise<Array<List>>;
  findAllByUser(user: User): Promise<Array<List>>;
  findOne(id: number): Promise<List | null>;
  update(id: number, data: any): Promise<UpdateResult>;
  delete(id: number): Promise<DeleteResult>;
}

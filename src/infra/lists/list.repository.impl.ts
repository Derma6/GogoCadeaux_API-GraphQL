import { ListRepositoryInterface } from '@domain/list/list.repository.interface';
import { Injectable } from '@nestjs/common';
import { List } from '@infra/lists/list.entity';
import { DeleteResult, EntityManager, Repository, UpdateResult } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { UserToList } from '@infra/lists/userToList.entity';
import { User } from '@infra/users/user.entity';

@Injectable()
export class ListRepositoryImpl implements ListRepositoryInterface {
  constructor(
    @InjectRepository(List) private listRepository: Repository<List>,
    @InjectEntityManager() private manager: EntityManager,
  ) {}

  // Use EntityManager to save the list and userToList in the same transaction
  async save(list: List, userToList: UserToList): Promise<List> {
    return this.manager.transaction(async (manager) => {
      const listResult = await manager.save(list);
      await manager.save(userToList);
      return listResult;
    });
  }
  async findAll(): Promise<Array<List>> {
    return await this.listRepository.find({
      relations: ['userToLists', 'articles', 'userToLists.users'],
      order: { createdAt: 'DESC' },
    });
  }

  async findAllByUser(user: User): Promise<Array<List>> {
    return this.listRepository.find({
      where: { userToLists: { userId: user.id } },
      relations: ['userToLists', 'articles', 'userToLists.user'],
      order: { createdAt: 'DESC' },
    });
  }
  async findOne(id: number): Promise<List | null> {
    return await this.listRepository.findOne({
      where: { id },
      relations: ['userToLists', 'articles', 'userToLists.user'],
    });
  }

  async update(id: number, data: any): Promise<UpdateResult> {
    return await this.listRepository.update(id, data);
  }
  async delete(id: number): Promise<DeleteResult> {
    return await this.listRepository.delete(id);
  }
}

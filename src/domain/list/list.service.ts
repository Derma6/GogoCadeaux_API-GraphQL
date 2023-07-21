import { Inject, Injectable } from '@nestjs/common';
import { ListRepositoryInterface } from '@domain/list/list.repository.interface';
import { CreateListInput } from '@infra/lists/inputs/create-list.input';
import { List } from '@infra/lists/list.entity';
import { User } from '@infra/users/user.entity';
import { UserToList } from '@infra/lists/userToList.entity';
import { UserToListRepositoryInterface } from '@domain/list/userToList.repository.interface';
import { UpdateListInput } from '@infra/lists/inputs/update-list.input';

@Injectable()
export class ListService {
  constructor(
    @Inject('MyListRepository')
    private readonly listRepository: ListRepositoryInterface,
    @Inject('MyUserToListRepository')
    private readonly userToListRepository: UserToListRepositoryInterface,
  ) {}

  async create(data: CreateListInput, user: User) {
    const list = new List();

    list.title = data.title;
    list.description = data.description;
    list.eventDate = data.eventDate;
    list.event = data.event;
    list.isPrivate = data.isPrivate;
    list.hideOfferedGifts = data.hideOfferedGifts;

    const userToList = new UserToList();

    userToList.user = user;
    userToList.list = list;
    userToList.isOwner = true;

    return await this.listRepository.save(list, userToList);
  }

  async findAll() {
    return this.listRepository.findAll();
  }

  async findAllByUser(user: User) {
    return this.listRepository.findAllByUser(user);
  }

  async findOne(id: number) {
    return this.listRepository.findOne(id);
  }

  async update(id: number, data: UpdateListInput, user: User) {
    // TODO: Refactor this method to use transactions or to execute in a single query
    // TODO: Return the updated list to refresh the cache in front end applications (Apollo Client)
    const list = await this.listRepository.findOne(id);

    if (!list) {
      throw new Error('List not found');
    }

    if (!this.isOwner(user, list)) {
      throw new Error('You are not the owner of this list');
    }

    const updateResult = await this.listRepository.update(id, data);

    if (updateResult.affected === 0) {
      throw new Error('List not found');
    }

    return 'List updated successfully';
  }

  async delete(id: number, user: User) {
    // TODO: Refactor this method to use transactions or to execute in a single query
    const list = await this.listRepository.findOne(id);

    if (!list) {
      throw new Error('List not found');
    }

    if (!this.isOwner(user, list)) {
      throw new Error('You are not the owner of this list');
    }

    const deleteResult = await this.listRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new Error('List not found');
    } else {
      return 'List deleted successfully';
    }
  }

  // Utils methods
  private isOwner(user: User, list: List) {
    for (const userToList of list.userToLists) {
      if (userToList.user.id === user.id && userToList.isOwner) {
        return true;
      }
    }
    return false;
  }

  private isContributor(user: User, list: List) {
    for (const userToList of list.userToLists) {
      if (userToList.user.id === user.id && !userToList.isOwner) {
        return true;
      }
    }
    return false;
  }

  private isOwnerOrContributor(user: User, list: List) {
    return this.isOwner(user, list) || this.isContributor(user, list);
  }
}

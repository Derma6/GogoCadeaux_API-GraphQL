import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateListInput } from './dto/create-list.input';
import { UpdateListInput } from './dto/update-list.input';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UserToList } from '../customJoinTable/userToList.entity';
import { Article } from '../articles/entities/article.entity';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List) private readonly listRepository: Repository<List>,
    @InjectRepository(UserToList)
    private readonly userToListRepository: Repository<UserToList>,
  ) {}

  // CRUD operations for lists
  async create(createListInput: CreateListInput, user: User) {
    try {
      const list = await this.listRepository.save(
        this.listRepository.create(createListInput),
      );

      await this.userToListRepository.save(
        this.userToListRepository.create({
          list,
          user,
          isOwner: true,
        }),
      );
    } catch (error) {
      return 'Error creating list';
    }

    return 'List created successfully';
  }

  findAll() {
    return `This action returns all lists`;
  }

  findOne(id: number) {
    // TODO manage private lists
    return this.listRepository.findOne({
      where: { id },
      relations: ['userToLists', 'articles', 'userToLists.user'],
    });
  }

  async findMyLists(loggedUser: User) {
    return this.listRepository.find({
      where: { userToLists: { userId: loggedUser.id } },
      relations: ['userToLists', 'articles', 'userToLists.user'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: number, updateListInput: UpdateListInput, loggedUser: User) {
    const list = await this.listRepository.findOne({
      where: { id },
      relations: { userToLists: true },
    });

    if (!list) {
      return { message: 'List not found' };
    }

    // Check if logged user is owner or contributor of the list
    if (!this.isOwnerOrContributor(list, loggedUser)) {
      throw new UnauthorizedException('You are not contributor of this list');
    }

    try {
      await this.listRepository.update(id, updateListInput);
    } catch (error) {
      return 'Error updating list';
    }
    return 'List updated successfully';
  }

  async remove(id: number, loggedUser: User) {
    const list = await this.listRepository.findOne({
      where: { id },
      relations: { userToLists: true },
    });

    if (!list) {
      return { message: 'List not found' };
    }

    // Check if logged user is owner of the list
    if (!this.isOwner(list, loggedUser)) {
      throw new UnauthorizedException('You are not the owner of this list');
    }

    try {
      await this.listRepository.delete(id);
    } catch (error) {
      return 'Error deleting list';
    }

    return 'List deleted successfully';
  }

  // Other operations
  async addArticleToList(list: List, article: Article) {
    await this.listRepository.save({
      ...list,
      articles: [...list.articles, article],
    });

    return 'Article added to list successfully';
  }

  // Check if logged user is owner of the list
  isOwner(list: List, loggedUser: User) {
    return this.getOwnerId(list) === loggedUser.id;
  }

  // Check if logged user is contributor of the list
  isContributor(list: List, loggedUser: User) {
    return this.getContributorsId(list).includes(loggedUser.id);
  }

  // Check if logged user is owner or contributor of the list
  isOwnerOrContributor(list: List, loggedUser: User) {
    return (
      this.isOwner(list, loggedUser) || this.isContributor(list, loggedUser)
    );
  }

  // Get owner id of the list
  private getOwnerId(list: List) {
    return (
      list.userToLists.find((userToList) => userToList.isOwner)?.userId ?? null
    );
  }

  // Get contributors id of the list
  private getContributorsId(list: List) {
    return list.userToLists
      .filter((userToList) => !userToList.isOwner)
      .map((userToList) => userToList.userId);
  }
}

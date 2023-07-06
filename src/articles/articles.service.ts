import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { Article } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { ListsService } from '../lists/lists.service';
import { SetOfferedArticleInput } from './dto/set-offered-article.input';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly listService: ListsService,
  ) {}

  async create(createArticleInput: CreateArticleInput, user: User) {
    const list = await this.listService.findOne(createArticleInput.listId);

    if (!list) {
      return 'List not found';
    }

    if (!this.listService.isOwnerOrContributor(list, user)) {
      throw new UnauthorizedException('You are not contributor of this list');
    }

    if (
      list.articles.find((article) => article.link === createArticleInput.link)
    ) {
      return 'Article already added';
    }

    const article = await this.articleRepository.save(
      this.articleRepository.create(createArticleInput),
    );

    return this.listService.addArticleToList(list, article);
  }

  findOne(id: number) {
    return this.articleRepository.findOne({
      where: { id },
      relations: ['list', 'list.userToLists'],
    });
  }

  async setOffered(obj: SetOfferedArticleInput) {
    const article = await this.findOne(obj.id);

    if (!article) {
      return 'Article not found';
    }

    if (article.isOffered) {
      return 'Article already offered';
    }

    await this.articleRepository.update(obj.id, {
      isOffered: true,
      isOfferedBy: obj.isOfferedBy,
    });

    return `Article ${obj.id} offered`;
  }

  async update(
    id: number,
    updateArticleInput: UpdateArticleInput,
    loggedUser: User,
  ) {
    const article = await this.findOne(id);

    if (!article) {
      return 'Article not found';
    }

    if (!this.listService.isOwnerOrContributor(article.list, loggedUser)) {
      throw new UnauthorizedException('You are not contributor of this list');
    }

    await this.articleRepository.update(id, updateArticleInput);

    return `Article ${id} updated`;
  }

  async remove(id: number, loggedUser: User) {
    const article = await this.findOne(id);

    if (!article) {
      return 'Article not found';
    }

    if (!this.listService.isOwnerOrContributor(article.list, loggedUser)) {
      throw new UnauthorizedException('You are not contributor of this list');
    }

    await this.articleRepository.delete(id);

    return `Article ${id} deleted from list ${article.list.id}`;
  }
}

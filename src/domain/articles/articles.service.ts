import { Inject, Injectable } from '@nestjs/common';
import { ArticleRepositoryInterface } from '@domain/articles/article.repository.interface';
import { Article } from '@infra/articles/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @Inject('MyArticleRepository')
    private readonly articleRepository: ArticleRepositoryInterface,
  ) {}

  async create(data: any) {
    const article = new Article();

    article.name = data.name;
    article.description = data.description;
    article.link = data.url;
  }
}

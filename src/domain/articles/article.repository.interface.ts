import { Article } from '@infra/articles/article.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

export interface ArticleRepositoryInterface {
  save(article: Article): Promise<Article>;
  findOne(id: number): Promise<Article>;
  update(id: number, data: any): Promise<UpdateResult>;
  delete(id: number): Promise<DeleteResult>;
}

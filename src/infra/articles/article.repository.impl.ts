import { ArticleRepositoryInterface } from '@domain/articles/article.repository.interface';
import { Article } from '@infra/articles/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

export class ArticleRepositoryImpl implements ArticleRepositoryInterface {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async save(article: Article): Promise<Article> {
    return new Promise(async (resolve, reject) => {
      await this.articleRepository
        .save(article)
        .then((article) => {
          resolve(article);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async findOne(id: number): Promise<Article> {
    return new Promise(async (resolve, reject) => {
      await this.articleRepository
        .findOne({
          where: { id },
          relations: ['user', 'list'],
        })
        .then((article) => {
          if (!article) {
            throw new Error('Article not found');
          }
          resolve(article);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async update(id: number, data: any): Promise<UpdateResult> {
    return new Promise(async (resolve, reject) => {
      await this.articleRepository
        .update(id, data)
        .then((article) => {
          resolve(article);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async delete(id: number): Promise<DeleteResult> {
    return new Promise(async (resolve, reject) => {
      await this.articleRepository
        .delete(id)
        .then((article) => {
          resolve(article);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

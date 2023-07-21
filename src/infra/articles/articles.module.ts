import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListsModule } from '@infra/lists/lists.module';
import { ArticlesService } from '@domain/articles/articles.service';
import { Article } from '@infra/articles/article.entity';
import { ArticlesResolver } from '@infra/articles/articles.resolver';
import { CreateArticleUseCase } from '@useCases/articles/create-article.usecase';
import { UpdateArticleUseCase } from '@useCases/articles/update-article.usecase';
import { DeleteArticleUseCase } from '@useCases/articles/delete-article.usecase';
import { SetArticleOfferedUseCase } from '@useCases/articles/set-article-offered.usecase';
import { ArticleRepositoryImpl } from '@infra/articles/article.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), ListsModule],
  providers: [
    Article,
    ArticlesResolver,
    ArticlesService,
    CreateArticleUseCase,
    UpdateArticleUseCase,
    DeleteArticleUseCase,
    SetArticleOfferedUseCase,
    {
      provide: 'MyArticleRepository',
      useClass: ArticleRepositoryImpl,
    },
  ],
})
export class ArticlesModule {}

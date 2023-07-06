import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesResolver } from './articles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { ListsModule } from '../lists/lists.module';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), ListsModule],
  providers: [ArticlesResolver, ArticlesService],
})
export class ArticlesModule {}

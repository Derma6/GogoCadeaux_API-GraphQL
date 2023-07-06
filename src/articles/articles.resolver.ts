import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ArticlesService } from './articles.service';
import { Article } from './entities/article.entity';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { SetOfferedArticleInput } from './dto/set-offered-article.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../customDecorator/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Resolver(() => Article)
export class ArticlesResolver {
  constructor(private readonly articlesService: ArticlesService) {}

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  createArticle(
    @Args('createArticleInput') createArticleInput: CreateArticleInput,
    @CurrentUser() user: User,
  ) {
    return this.articlesService.create(createArticleInput, user);
  }

  @Query(() => Article, { name: 'article' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.articlesService.findOne(id);
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  updateArticle(
    @Args('updateArticleInput') updateArticleInput: UpdateArticleInput,
    @CurrentUser() user: User,
  ) {
    return this.articlesService.update(
      updateArticleInput.id,
      updateArticleInput,
      user,
    );
  }

  @Mutation(() => String)
  offerArticle(
    @Args('setOfferedArticleInput')
    setOfferedArticleInput: SetOfferedArticleInput,
  ) {
    return this.articlesService.setOffered(setOfferedArticleInput);
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  removeArticle(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ) {
    return this.articlesService.remove(id, user);
  }
}

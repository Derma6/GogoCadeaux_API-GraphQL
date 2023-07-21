import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '@infra/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '@/customDecorator/current-user.decorator';
import { User } from '@infra/users/user.entity';
import { CreateArticleUseCase } from '@useCases/articles/create-article.usecase';
import { DeleteArticleUseCase } from '@useCases/articles/delete-article.usecase';
import { UpdateArticleUseCase } from '@useCases/articles/update-article.usecase';
import { SetArticleOfferedUseCase } from '@useCases/articles/set-article-offered.usecase';
import { CreateArticleInput } from '@infra/articles/inputs/create-article.input';
import { UpdateArticleInput } from '@infra/articles/inputs/update-article.input';
import { SetArticleOfferedInput } from '@infra/articles/inputs/set-article-offered.input';
import { Article } from '@infra/articles/article.entity';

@Resolver(() => Article)
export class ArticlesResolver {
  constructor(
    private readonly createArticleUseCase: CreateArticleUseCase,
    private readonly updateArticleUseCase: UpdateArticleUseCase,
    private readonly deleteArticleUseCase: DeleteArticleUseCase,
    private readonly setArticleOfferedUseCase: SetArticleOfferedUseCase,
  ) {}

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  createArticle(
    @Args('createArticleInput') createArticleInput: CreateArticleInput,
    @CurrentUser() user: User,
  ) {
    return this.createArticleUseCase.execute(createArticleInput, user);
  }

  // @Query(() => Article, { name: 'article' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.articlesService.findOne(id);
  // }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  updateArticle(
    @Args('updateArticleInput') updateArticleInput: UpdateArticleInput,
    @CurrentUser() user: User,
  ) {
    return this.updateArticleUseCase.execute(updateArticleInput, user);
  }

  @Mutation(() => String)
  offerArticle(
    @Args('setOfferedArticleInput')
    setOfferedArticleInput: SetArticleOfferedInput,
  ) {
    return this.setArticleOfferedUseCase.execute(setOfferedArticleInput);
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  deleteArticle(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ) {
    return this.deleteArticleUseCase.execute(id, user);
  }
}

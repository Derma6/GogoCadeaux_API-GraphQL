import { ArticlesService } from '@domain/articles/articles.service';
import { CreateArticleInput } from '@infra/articles/inputs/create-article.input';
import { User } from '@infra/users/user.entity';

export class CreateArticleUseCase {
  constructor(private readonly articlesService: ArticlesService) {}

  async execute(createArticleInput: CreateArticleInput, user: User) {
    // TODO implement
    return;
  }
}

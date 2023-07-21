import { ArticlesService } from '@domain/articles/articles.service';
import { UpdateArticleInput } from '@infra/articles/inputs/update-article.input';
import { User } from '@infra/users/user.entity';

export class UpdateArticleUseCase {
  constructor(private readonly articlesService: ArticlesService) {}

  async execute(data: UpdateArticleInput, user: User) {
    // TODO implement
    return;
  }
}

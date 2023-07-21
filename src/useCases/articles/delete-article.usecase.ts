import { ArticlesService } from '@domain/articles/articles.service';
import { User } from '@infra/users/user.entity';

export class DeleteArticleUseCase {
  constructor(private readonly articlesService: ArticlesService) {}

  async execute(id: number, user: User) {
    // TODO implement
    return;
  }
}

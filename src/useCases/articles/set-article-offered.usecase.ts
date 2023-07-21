import { ArticlesService } from '@domain/articles/articles.service';
import { SetArticleOfferedInput } from '@infra/articles/inputs/set-article-offered.input';

export class SetArticleOfferedUseCase {
  constructor(private readonly articlesService: ArticlesService) {}

  async execute(setOfferedArticleInput: SetArticleOfferedInput) {
    // TODO implement
    return;
  }
}

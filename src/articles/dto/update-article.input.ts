import { CreateArticleInput } from './create-article.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType('UpdateArticleInput', { description: 'Update article input' })
export class UpdateArticleInput extends PartialType(CreateArticleInput) {
  @Field(() => Int)
  id: number;
}

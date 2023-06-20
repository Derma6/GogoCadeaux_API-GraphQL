import { Field, InputType } from '@nestjs/graphql';

@InputType('CreateArticleInputType', { description: 'Create article input' })
export class CreateArticleInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String, { nullable: true })
  indicativePrice: string;

  @Field(() => String)
  picture: string;

  @Field(() => String)
  href: string;

  @Field(() => Number)
  listId: number;
}

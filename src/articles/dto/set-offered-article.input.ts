import { Field, InputType, Int } from '@nestjs/graphql';

@InputType('SetOfferedArticleInputType', {
  description: 'Set article is offered input',
})
export class SetOfferedArticleInput {
  @Field(() => Int)
  id: number;

  @Field(() => Boolean)
  isOffered: boolean;

  @Field(() => String)
  isOfferedBy: string;
}

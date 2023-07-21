import { Field, InputType, Int } from '@nestjs/graphql';

@InputType('SetArticleOfferedInputType', {
  description: 'Set article is offered input',
})
export class SetArticleOfferedInput {
  @Field(() => Int)
  id: number;

  @Field(() => Boolean)
  isOffered: boolean;

  @Field(() => String || undefined)
  isOfferedBy: string | undefined;
}

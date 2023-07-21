import { Field, InputType } from '@nestjs/graphql';
import { EventTypeEnum } from '@infra/lists/list.entity';

@InputType('CreateListInput', { description: 'Create list input' })
export class CreateListInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => Date)
  eventDate: Date;

  @Field(() => EventTypeEnum)
  event: EventTypeEnum;

  @Field(() => Boolean)
  isPrivate: boolean;

  @Field(() => Boolean)
  hideOfferedGifts: boolean;
}

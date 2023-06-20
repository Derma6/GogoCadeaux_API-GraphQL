import { Field, InputType } from '@nestjs/graphql';
import { EventEnumType } from '../entities/list.entity';

@InputType('CreateListInput', { description: 'Create list input' })
export class CreateListInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => Date)
  eventDate: Date;

  @Field(() => EventEnumType)
  event: EventEnumType;

  @Field(() => Boolean)
  isPrivate: boolean;

  @Field(() => Boolean)
  hideOfferedGifts: boolean;
}

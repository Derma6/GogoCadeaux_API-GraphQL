import { CreateListInput } from './create-list.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType('UpdateListInput', { description: 'Update list input' })
export class UpdateListInput extends PartialType(CreateListInput) {
  @Field(() => Int)
  id: number;
}

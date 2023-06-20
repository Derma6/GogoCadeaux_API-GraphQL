import { Field, InputType } from '@nestjs/graphql';

@InputType('CreateAddressInput', { description: 'Create address input' })
export class CreateAddressInput {
  @Field(() => String)
  label: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  city: string;

  @Field(() => Number)
  postalCode: number;

  @Field(() => String)
  street: string;

  @Field(() => Number)
  number: number;

  @Field(() => String)
  apartment: string;

  @Field(() => Number)
  userId: number;
}

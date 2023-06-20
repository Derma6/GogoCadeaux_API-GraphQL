import { Field, InputType } from '@nestjs/graphql';

@InputType('CreateUserInput', { description: 'Create user input' })
export class CreateUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  photo: string;
}

import { Field, InputType } from '@nestjs/graphql';

@InputType('RegisterUserInput', { description: 'Register user input' })
export class RegisterUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;
}

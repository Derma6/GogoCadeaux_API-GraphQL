import { Field, InputType } from '@nestjs/graphql';

@InputType('RegisterInput', { description: 'Register input' })
export class RegisterInput {
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

import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@infra/users/user.entity';

@ObjectType('LoginOutput', { description: 'Login output' })
export class LoginOutput {
  @Field(() => String)
  accessToken: string;

  @Field(() => User)
  user: User;
  // @Field(() => String)
  // refreshToken: string;
}

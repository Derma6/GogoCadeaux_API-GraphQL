import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType('LoginResponse', { description: 'Login response' })
export class LoginResponse {
  @Field(() => String)
  access_token: string;

  // @Field(() => String)
  // refresh_token: string;

  @Field(() => User)
  user: User;
}

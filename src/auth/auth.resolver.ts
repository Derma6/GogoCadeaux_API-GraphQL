import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login.response';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../customDecorator/current-user.decorator';
import { LoginInput } from './dto/login.input';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterInput } from './dto/register.input';

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(@Args('loginInput') loginInput: LoginInput, @Context() context: any) {
    return this.authService.login(context.user);
  }

  @Mutation(() => User)
  register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }

  @Query(() => User, { name: 'profile' })
  @UseGuards(JwtAuthGuard)
  profile(@CurrentUser() user: User) {
    return this.usersService.findOneByEmail(user.email);
  }
}

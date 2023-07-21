import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '@infra/users/user.entity';
import { LoginInput } from '@infra/auth/inputs/login.input';
import { RegisterUserUseCase } from '@useCases/auth/register-user.usecase';
import { VerifyEmailUseCase } from '@useCases/auth/verify-email.usecase';
import { LoginUseCase } from '@useCases/auth/login.usecase';
import { RegisterUserInput } from '@infra/auth/inputs/register-user.input';
import { LoginOutput } from '@infra/auth/outputs/login.output';

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly verifyEmailUseCase: VerifyEmailUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Mutation(() => User)
  register(@Args('registerInput') registerInput: RegisterUserInput) {
    return this.registerUserUseCase.execute(registerInput);
  }

  @Mutation(() => String)
  verifyEmail(@Args('verificationCode') verificationCode: string) {
    return this.verifyEmailUseCase.execute(verificationCode);
  }

  @Mutation(() => LoginOutput)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.loginUseCase.execute(loginInput);
  }

  // @UseGuards(JwtAuthGuard)
  // @Query(() => User, { name: 'profile' })
  // profile(@CurrentUser() user: User) {
  //   return this.usersService.findOneByEmail(user.email);
  // }
}

import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '@infra/users/user.entity';
import { JwtAuthGuard } from '@infra/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '@/customDecorator/current-user.decorator';
import { UpdateUserUseCase } from '@useCases/users/update-user.usecase';
import { DeleteUserUseCase } from '@useCases/users/delete-user.usecase';
import { UpdateUserInput } from '@infra/users/inputs/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  // TODO protected this route for admin only
  // @Query(() => [User], { name: 'users' })
  // @UseGuards(JwtAuthGuard)
  // findAll() {
  //   return this.usersService.findAll();
  // }
  //
  // // searchBar query
  // @Query(() => [User], { name: 'searchUsersByName' })
  // searchUsersByName(
  //   @Args('searchTerm', { type: () => String }) searchTerm: string,
  // ) {
  //   return this.usersService.searchUsersByName(searchTerm);
  // }
  //
  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => String }) id: string) {
  //   return this.usersService.findOneById(id);
  // }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser() user: User,
  ) {
    return this.updateUserUseCase.execute(user.id);
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  deleteUser(@CurrentUser() user: User) {
    return this.deleteUserUseCase.execute(user.id);
  }
}

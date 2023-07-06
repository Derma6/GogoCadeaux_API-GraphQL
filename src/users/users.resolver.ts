import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../customDecorator/current-user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // TODO protected this route for admin only
  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  // searchBar query
  @Query(() => [User], { name: 'searchUsersByName' })
  searchUsersByName(
    @Args('searchTerm', { type: () => String }) searchTerm: string,
  ) {
    return this.usersService.searchUsersByName(searchTerm);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOneById(id);
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser() user: User,
  ) {
    return this.usersService.update(user.id, updateUserInput);
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  removeUser(@CurrentUser() user: User) {
    return this.usersService.remove(user.id);
  }
}

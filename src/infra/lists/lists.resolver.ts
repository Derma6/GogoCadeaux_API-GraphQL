import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { List } from '@infra/lists/list.entity';
import { CreateListInput } from '@infra/lists/inputs/create-list.input';
import { UpdateListInput } from '@infra/lists/inputs/update-list.input';
import { CurrentUser } from '@/customDecorator/current-user.decorator';
import { User } from '@infra/users/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@infra/auth/guards/jwt-auth.guard';
import { CreateListUseCase } from '@useCases/lists/create-list.usecase';
import { FindAllListsUseCase } from '@useCases/lists/find-all-lists.usecase';
import { GetOneListUseCase } from '@useCases/lists/get-one-list.usecase';
import { UpdateListUseCase } from '@useCases/lists/update-list.usecase';
import { DeleteListUseCase } from '@useCases/lists/delete-list.usecase';
import { GetLoggedUserListUseCase } from '@useCases/lists/get-logged-user-list.usecase';

@Resolver(() => List)
export class ListsResolver {
  constructor(
    private readonly createListUseCase: CreateListUseCase,
    private readonly findAllListsUseCase: FindAllListsUseCase,
    private readonly getOneListUseCase: GetOneListUseCase,
    private readonly updateListUseCase: UpdateListUseCase,
    private readonly deleteListUseCase: DeleteListUseCase,
    private readonly getLoggedUserListUseCase: GetLoggedUserListUseCase,
  ) {}

  @Mutation(() => List)
  @UseGuards(JwtAuthGuard)
  async createList(
    @Args('createListInput') createListInput: CreateListInput,
    @CurrentUser() user: User,
  ) {
    return await this.createListUseCase.execute(createListInput, user);
  }

  @Query(() => [List], { name: 'getAllLists' })
  findAll() {
    return this.findAllListsUseCase.execute();
  }

  @Query(() => List, { name: 'list' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.getOneListUseCase.execute(id);
  }

  @Query(() => [List], { name: 'getLoggedUserLists' })
  @UseGuards(JwtAuthGuard)
  getLoggedUserLists(@CurrentUser() user: User) {
    return this.getLoggedUserListUseCase.execute(user);
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  updateList(
    @Args('updateListInput') updateListInput: UpdateListInput,
    @CurrentUser() user: User,
  ) {
    return this.updateListUseCase.execute(updateListInput, user);
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  deleteList(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ) {
    return this.deleteListUseCase.execute(id, user);
  }
}

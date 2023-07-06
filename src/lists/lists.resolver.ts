import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ListsService } from './lists.service';
import { List } from './entities/list.entity';
import { CreateListInput } from './dto/create-list.input';
import { UpdateListInput } from './dto/update-list.input';
import { CurrentUser } from '../customDecorator/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver(() => List)
export class ListsResolver {
  constructor(private readonly listsService: ListsService) {}

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  createList(
    @Args('createListInput') createListInput: CreateListInput,
    @CurrentUser() user: User,
  ) {
    return this.listsService.create(createListInput, user);
  }

  @Query(() => [List], { name: 'lists' })
  findAll() {
    return this.listsService.findAll();
  }

  @Query(() => List, { name: 'list' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.listsService.findOne(id);
  }

  @Query(() => [List], { name: 'findMyLists' })
  @UseGuards(JwtAuthGuard)
  findMyLists(@CurrentUser() user: User) {
    return this.listsService.findMyLists(user);
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  updateList(
    @Args('updateListInput') updateListInput: UpdateListInput,
    @CurrentUser() user: User,
  ) {
    return this.listsService.update(updateListInput.id, updateListInput, user);
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  removeList(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ) {
    return this.listsService.remove(id, user);
  }
}

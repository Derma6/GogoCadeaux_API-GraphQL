import { Injectable } from '@nestjs/common';
import { ListService } from '@domain/list/list.service';
import { CreateListInput } from '@infra/lists/inputs/create-list.input';
import { User } from '@infra/users/user.entity';

@Injectable()
export class CreateListUseCase {
  constructor(private readonly listsService: ListService) {}

  async execute(createListInput: CreateListInput, user: User) {
    return this.listsService.create(createListInput, user);
  }
}

import { Injectable } from '@nestjs/common';
import { ListService } from '@domain/list/list.service';
import { UpdateListInput } from '@infra/lists/inputs/update-list.input';
import { User } from '@infra/users/user.entity';

@Injectable()
export class UpdateListUseCase {
  constructor(private readonly listService: ListService) {}

  async execute(updateListInput: UpdateListInput, user: User) {
    return this.listService.update(updateListInput.id, updateListInput, user);
  }
}

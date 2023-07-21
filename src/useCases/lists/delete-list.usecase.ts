import { Injectable } from '@nestjs/common';
import { ListService } from '@domain/list/list.service';
import { User } from '@infra/users/user.entity';

@Injectable()
export class DeleteListUseCase {
  constructor(private readonly listService: ListService) {}

  async execute(listId: number, user: User) {
    return await this.listService.delete(listId, user);
  }
}

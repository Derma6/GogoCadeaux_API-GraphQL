import { Injectable } from '@nestjs/common';
import { ListService } from '@domain/list/list.service';
import { User } from '@infra/users/user.entity';

@Injectable()
export class GetLoggedUserListUseCase {
  constructor(private readonly listService: ListService) {}

  async execute(user: User) {
    return this.listService.findAllByUser(user);
  }
}

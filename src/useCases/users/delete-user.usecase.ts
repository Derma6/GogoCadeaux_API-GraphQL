import { Injectable } from '@nestjs/common';
import { UsersService } from '@domain/users/users.service';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly usersService: UsersService) {}

  async execute(id: string) {
    // TODO: Implement
    return this.usersService.delete(id);
  }
}

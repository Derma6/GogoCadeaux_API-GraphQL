import { Injectable } from '@nestjs/common';
import { UsersService } from '@domain/users/users.service';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly usersService: UsersService) {}

  async execute(id: string) {
    // TODO: Implement
    return;
  }
}

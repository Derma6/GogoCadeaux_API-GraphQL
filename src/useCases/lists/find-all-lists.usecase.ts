import { Injectable } from '@nestjs/common';
import { ListService } from '@domain/list/list.service';

@Injectable()
export class FindAllListsUseCase {
  constructor(private readonly listService: ListService) {}
  async execute() {
    return;
  }
}

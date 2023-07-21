import { Injectable } from '@nestjs/common';
import { ListService } from '@domain/list/list.service';

@Injectable()
export class GetOneListUseCase {
  constructor(private readonly listService: ListService) {}

  async execute(id: number) {
    return await this.listService.findOne(id);
  }
}

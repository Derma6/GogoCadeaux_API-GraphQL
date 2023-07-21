import { UserToListRepositoryInterface } from '@domain/list/userToList.repository.interface';
import { UserToList } from '@infra/lists/userToList.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class UserToListRepositoryImpl implements UserToListRepositoryInterface {
  constructor(
    @InjectRepository(UserToList)
    private readonly userToListRepository: Repository<UserToList>,
  ) {}

  async save(userToList: UserToList): Promise<UserToList> {
    return await this.userToListRepository.save(userToList);
  }
}

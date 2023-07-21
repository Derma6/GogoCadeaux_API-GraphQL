import { UserToList } from '@infra/lists/userToList.entity';

export interface UserToListRepositoryInterface {
  save(userToList: UserToList): Promise<UserToList>;
}

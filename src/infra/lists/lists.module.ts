import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateListUseCase } from '@useCases/lists/create-list.usecase';
import { UpdateListUseCase } from '@useCases/lists/update-list.usecase';
import { ListsResolver } from '@infra/lists/lists.resolver';
import { List } from '@infra/lists/list.entity';
import { UserToList } from '@infra/lists/userToList.entity';
import { ListService } from '@domain/list/list.service';
import { DeleteListUseCase } from '@useCases/lists/delete-list.usecase';
import { GetOneListUseCase } from '@useCases/lists/get-one-list.usecase';
import { FindAllListsUseCase } from '@useCases/lists/find-all-lists.usecase';
import { ListRepositoryImpl } from '@infra/lists/list.repository.impl';
import { UserToListRepositoryImpl } from '@infra/lists/userToList.repository.impl';
import { GetLoggedUserListUseCase } from '@useCases/lists/get-logged-user-list.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([List, UserToList])],
  providers: [
    List,
    UserToList,
    ListsResolver,
    ListService,
    CreateListUseCase,
    UpdateListUseCase,
    DeleteListUseCase,
    GetOneListUseCase,
    FindAllListsUseCase,
    GetLoggedUserListUseCase,
    {
      provide: 'MyListRepository',
      useClass: ListRepositoryImpl,
    },
    {
      provide: 'MyUserToListRepository',
      useClass: UserToListRepositoryImpl,
    },
  ],
  exports: [ListService],
})
export class ListsModule {}

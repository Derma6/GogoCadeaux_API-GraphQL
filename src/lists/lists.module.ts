import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsResolver } from './lists.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { UserToList } from '../customJoinTable/userToList.entity';

@Module({
  imports: [TypeOrmModule.forFeature([List, UserToList])],
  providers: [ListsResolver, ListsService],
  exports: [ListsService],
})
export class ListsModule {}

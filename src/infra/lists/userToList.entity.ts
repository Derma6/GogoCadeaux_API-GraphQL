import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@infra/users/user.entity';
import { List } from '@infra/lists/list.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('userToLists')
@ObjectType('UserToList', { description: 'UserToList model' })
export class UserToList {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => String)
  userId: string;

  @Column()
  @Field(() => Number)
  listId: number;

  @Column()
  @Field(() => Boolean)
  // @IsBoolean()
  isOwner: boolean;

  @ManyToOne(() => User, (user) => user.userToLists)
  @Field(() => User)
  user: User;

  @ManyToOne(() => List, (list) => list.userToLists, {
    onDelete: 'CASCADE',
  })
  @Field(() => List)
  list: List;
}

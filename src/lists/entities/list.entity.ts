import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Article } from '../../articles/entities/article.entity';
import { Address } from '../../addresses/entities/address.entity';
import { UserToList } from '../../customJoinTable/userToList.entity';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum EventTypeEnum {
  BIRTH = 'BIRTH',
  BIRTHDAY = 'BIRTHDAY',
  CHRISTMAS = 'CHRISTMAS',
  WEDDING = 'WEDDING',
  BAPTISM = 'BAPTISM',
  HOUSE_WARMING = 'HOUSE_WARMING',
  OTHER = 'OTHER',
  GIFT = 'GIFT',
}

registerEnumType(EventTypeEnum, {
  name: 'EventTypeEnum',
});

@Entity('lists')
@ObjectType('List', { description: 'List model' })
export class List {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Date)
  eventDate: Date;

  @Column({
    type: 'enum',
    enum: EventTypeEnum,
  })
  @Field(() => EventTypeEnum)
  event: EventTypeEnum;

  @Column({
    default: false,
  })
  @Field(() => Boolean)
  isPrivate: boolean;

  @Column({
    default: false,
  })
  @Field(() => Boolean)
  hideOfferedGifts: boolean;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @OneToMany(() => UserToList, (userToList) => userToList.list)
  @Field(() => [UserToList])
  public userToLists: UserToList[];

  @OneToMany(() => Article, (article) => article.list)
  @Field(() => [Article])
  articles: Article[];

  @OneToOne(() => Address)
  @Field(() => Address)
  address: Address;
}

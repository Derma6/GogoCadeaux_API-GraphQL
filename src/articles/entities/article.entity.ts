import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { List } from '../../lists/entities/list.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Partner } from '../../partner/entities/partner.entity';

@Entity('articles')
@ObjectType('Article', { description: 'Article model' })
export class Article {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column({
    nullable: true,
    default: null,
  })
  @Field(() => String, { nullable: true })
  indicativePrice: string;

  @Column({
    default: false,
  })
  @Field(() => Boolean)
  isOffered: boolean;

  @Column({
    nullable: true,
    default: null,
  })
  @Field(() => String, { nullable: true })
  isOfferedBy: string;

  @Column({
    type: 'varchar',
    length: 512,
  })
  @Field(() => String)
  picture: string;

  @Column({
    type: 'varchar',
    length: 512,
  })
  @Field(() => String)
  link: string;

  @ManyToOne(() => List, (list) => list.articles, { onDelete: 'CASCADE' })
  @Field(() => List)
  list: List;

  @ManyToOne(() => Partner)
  @Field(() => Partner)
  partner: Partner;
}

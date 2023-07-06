import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('partner')
@ObjectType('Partner', { description: 'Partner model' })
export class Partner {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  affiliateCode: string;

  @Column()
  @Field(() => String)
  affiliateParams: string;

  @Column()
  @Field(() => String)
  baseUrl: string;

  @Column()
  @Field(() => String)
  logoUrl: string;
}

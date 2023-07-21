import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@infra/users/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('addresses')
@ObjectType('Address', { description: 'Address model' })
export class Address {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => String)
  label: string;

  @Column()
  @Field(() => String)
  country: string;

  @Column()
  @Field(() => String)
  city: string;

  @Column()
  @Field(() => Number)
  postalCode: number;

  @Column()
  @Field(() => String)
  street: string;

  @Column()
  @Field(() => Number)
  number: number;

  @Column()
  @Field(() => String)
  apartment: string;

  @ManyToOne(() => User, (user) => user.address)
  @Field(() => User)
  user: User;
}

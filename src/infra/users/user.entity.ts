import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from '@infra/addresses/address.entity';
import { UserToList } from '@infra/lists/userToList.entity';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum RoleEnumType {
  USER = 'user',
  ADMIN = 'admin',
}

registerEnumType(RoleEnumType, {
  name: 'RoleEnumType',
});

@Entity('users')
@ObjectType('User', { description: 'User model' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  firstName: string;

  @Column()
  @Field(() => String)
  lastName: string;

  @Index('email_index')
  @Column({
    unique: true,
  })
  @Field(() => String)
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: RoleEnumType,
    default: RoleEnumType.USER,
  })
  @Field(() => RoleEnumType)
  role: RoleEnumType.USER;

  @Column({
    default: null,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  photo: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  // @IsDate()
  dateOfBirth: Date;

  @Column({
    type: 'boolean',
    default: false,
  })
  @Field(() => Boolean)
  // @IsBoolean()
  isEmailVerified: boolean;

  @Index('verificationCode_index')
  @Column({
    type: 'text',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  verificationCode!: string | null;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @OneToMany(() => Address, (address) => address.user)
  @Field(() => [Address])
  address: Address[];

  @OneToMany(() => UserToList, (userToList) => userToList.user)
  @Field(() => [UserToList], { nullable: true })
  public userToLists: UserToList[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  toJSON() {
    return {
      ...this,
      password: undefined,
      isVerified: undefined,
      verificationCode: undefined,
    };
  }
}

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
import { Address } from '../../addresses/entities/address.entity';
import { UserToList } from '../../customJoinTable/userToList.entity';
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
  // @IsString()
  @Field(() => String)
  firstName: string;

  @Column()
  // @IsString()
  @Field(() => String)
  lastName: string;

  @Index('email_index')
  @Column({
    unique: true,
  })
  @Field(() => String)
  // @IsEmail()
  email: string;

  @Column()
  // @IsString()
  password: string;

  @Column({
    type: 'enum',
    enum: RoleEnumType,
    default: RoleEnumType.USER,
  })
  @Field(() => RoleEnumType)
  // @IsEnum(RoleEnumType)
  role: RoleEnumType.USER;

  @Column({
    default: null,
    nullable: true,
  })
  @Field(() => String)
  // @IsString()
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
  isVerified: boolean;

  @Index('verificationCode_index')
  @Column({
    type: 'text',
    nullable: true,
  })
  // @IsJWT()
  @Field(() => String || null)
  verificationCode!: string | null;

  @CreateDateColumn()
  // @IsDate()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  // @IsDate()
  @Field(() => Date)
  updatedAt: Date;

  @OneToMany(() => Address, (address) => address.user)
  @Field(() => [Address])
  address: Address[];

  @OneToMany(() => UserToList, (userToList) => userToList.user)
  @Field(() => [UserToList])
  public userToLists: UserToList[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
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

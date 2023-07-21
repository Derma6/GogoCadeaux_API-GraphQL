import { Module } from '@nestjs/common';
import { UsersResolver } from '@infra/users/users.resolver';
import { User } from '@infra/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserRepositoryImpl } from '@infra/users/user.repository.impl';
import { UpdateUserUseCase } from '@useCases/users/update-user.usecase';
import { DeleteUserUseCase } from '@useCases/users/delete-user.usecase';
import { UsersService } from '@domain/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule],
  providers: [
    {
      provide: 'MyUserRepository',
      useClass: UserRepositoryImpl,
    },
    UsersResolver,
    UsersService,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}

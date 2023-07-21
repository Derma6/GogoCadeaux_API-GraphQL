import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@infra/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '@domain/auth/auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from '@infra/auth/strategies/jwt.strategy';
import { VerifyEmailUseCase } from '@useCases/auth/verify-email.usecase';
import { LoginUseCase } from '@useCases/auth/login.usecase';
import { RegisterUserUseCase } from '@useCases/auth/register-user.usecase';
import { EnvironmentConfigModule } from '@infra/config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '@infra/config/environment-config/environment-config.service';
import { UserRepositoryImpl } from '@infra/users/user.repository.impl';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    EnvironmentConfigModule,
    JwtModule.registerAsync({
      imports: [EnvironmentConfigModule],
      useFactory: (configService: EnvironmentConfigService) => ({
        secret: configService.getJwtAccessTokenSecret(),
        signOptions: {
          expiresIn: configService.getJwtAccessTokenExpiresIn(),
        },
      }),
      inject: [EnvironmentConfigService],
    }),
  ],
  providers: [
    {
      provide: 'MyUserRepository',
      useClass: UserRepositoryImpl,
    },
    AuthResolver,
    AuthService,
    JwtStrategy,
    RegisterUserUseCase,
    VerifyEmailUseCase,
    LoginUseCase,
  ],
})
export class AuthModule {}

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@infra/users/user.entity';
import { UserRepositoryInterface } from '@domain/users/user.repository.interface';
import { LoginOutput } from '@infra/auth/outputs/login.output';
import { RegisterUserInput } from '@infra/auth/inputs/register-user.input';
import { LoginInput } from '@infra/auth/inputs/login.input';

@Injectable()
export class AuthService {
  constructor(
    @Inject('MyUserRepository')
    private readonly usersRepository: UserRepositoryInterface,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerInput: RegisterUserInput) {
    const userExists = await this.usersRepository.findOneByEmail(
      registerInput.email,
    );

    if (userExists) throw new Error('User already exists');

    const user = new User();

    user.firstName = registerInput.firstName;
    user.lastName = registerInput.lastName;
    user.email = registerInput.email;
    user.password = registerInput.password;

    // Password is hashed in the entity before insert
    return this.usersRepository.save(user);
  }

  async verifyEmail(verificationCode: string) {
    const decoded = this.jwtService.verify(verificationCode, {
      secret: this.configService.get('VERIFICATION_TOKEN_SECRET'),
    });

    if (!decoded) throw new UnauthorizedException('Invalid verification code');

    const user = await this.usersRepository.findOneByEmail(decoded.email);

    if (!user) throw new UnauthorizedException('User not found');

    await this.usersRepository.update(user.id, {
      isEmailVerified: true,
      verificationCode: null,
    });

    return 'Email verified';
  }

  async login(loginInput: LoginInput): Promise<LoginOutput> {
    const user = await this.validateUser(loginInput.email, loginInput.password);

    const payload = { email: user?.email, sub: user?.id };

    return {
      user,
      accessToken: this.jwtService.sign(payload),
      // refresh_token: this.jwtService.sign(payload, {
      //   secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      //   expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION'),
      // }),
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOneByEmail(email);

    if (user && (await user.comparePassword(password))) {
      return user.toJSON();
    }

    return null;
  }

  // async refresh({ refresh_token }: { refresh_token: string }): Promise<any> {
  //   const decoded = this.jwtService.verify(refresh_token, {
  //     secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
  //   });
  //
  //   if (!decoded) throw new UnauthorizedException('Invalid refresh token');
  //
  //   const user = await this.usersService.findOneByEmail(decoded.email);
  //
  //   if (!user) throw new UnauthorizedException('Email not found');
  //
  //   const payload = { email: user.email, sub: user.id };
  //
  //   return {
  //     access_token: this.jwtService.sign(payload, {
  //       secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
  //       expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION'),
  //     }),
  //     refresh_token: this.jwtService.sign(payload, {
  //       secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
  //       expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION'),
  //     }),
  //   };
  // }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterInput } from './dto/register.input';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    const isPasswordMatching = user?.password
      ? await bcrypt.compare(password, user.password)
      : false;

    if (user && isPasswordMatching) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User): Promise<any> {
    const payload = { email: user?.email, sub: user?.id };

    return {
      access_token: this.jwtService.sign(payload),
      // refresh_token: this.jwtService.sign(payload, {
      //   secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      //   expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION'),
      // }),
      user,
    };
  }

  async refresh({ refresh_token }: { refresh_token: string }): Promise<any> {
    const decoded = this.jwtService.verify(refresh_token, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
    });

    if (!decoded) throw new UnauthorizedException('Invalid refresh token');

    const user = await this.usersService.findOneByEmail(decoded.email);

    if (!user) throw new UnauthorizedException('Email not found');

    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION'),
      }),
      refresh_token: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION'),
      }),
    };
  }

  async register(registerInput: RegisterInput): Promise<any> {
    const userExists = await this.usersService.findOneByEmail(
      registerInput.email,
    );

    if (userExists) throw new Error('User already exists');

    // Password is hashed in the entity before insert
    return await this.usersService.create(registerInput);
  }

  async verifyEmail({ verificationCode }: { verificationCode: string }) {
    const decoded = this.jwtService.verify(verificationCode, {
      secret: this.configService.get('VERIFICATION_TOKEN_SECRET'),
    });

    if (!decoded) throw new UnauthorizedException('Invalid verification code');

    const user = await this.usersService.findOneByEmail(decoded.email);

    if (!user) throw new UnauthorizedException('Email not found');

    await this.usersService.setUserVerified(user.id);

    return {
      message: 'Email verified',
    };
  }
}

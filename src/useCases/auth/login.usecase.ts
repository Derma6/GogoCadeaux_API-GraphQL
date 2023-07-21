import { AuthService } from '@domain/auth/auth.service';
import { User } from '@infra/users/user.entity';
import { Injectable } from '@nestjs/common';
import { LoginInput } from '@infra/auth/inputs/login.input';

@Injectable()
export class LoginUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }
}

import { RegisterUserInput } from '@infra/auth/inputs/register-user.input';
import { AuthService } from '@domain/auth/auth.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(registerUserInput: RegisterUserInput) {
    return this.authService.register(registerUserInput);
  }
}

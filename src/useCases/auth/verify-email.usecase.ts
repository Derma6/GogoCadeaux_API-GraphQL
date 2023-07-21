import { AuthService } from '@domain/auth/auth.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VerifyEmailUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(verificationCode: string) {
    return this.authService.verifyEmail(verificationCode);
  }
}

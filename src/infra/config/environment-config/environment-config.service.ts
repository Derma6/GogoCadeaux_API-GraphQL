import { Injectable } from '@nestjs/common';
import { DatabaseConfig } from '@domain/database.interface';
import { ConfigService } from '@nestjs/config';
import { AuthConfig } from '@domain/auth.interface';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig, AuthConfig {
  constructor(private configService: ConfigService) {}

  /*
   * DatabaseConfig
   */

  getDatabaseHost(): string {
    return this.configService.get('DATABASE_HOST') as string;
  }
  getDatabasePort(): number {
    return this.configService.get('DATABASE_PORT') as number;
  }
  getDatabaseUser(): string {
    return this.configService.get('DATABASE_USER') as string;
  }
  getDatabasePassword(): string {
    return this.configService.get('DATABASE_PASSWORD') as string;
  }
  getDatabaseName(): string {
    return this.configService.get('DATABASE_NAME') as string;
  }
  getDatabaseSchema(): string {
    return this.configService.get('DATABASE_SCHEMA') as string;
  }
  getDatabaseSync(): boolean {
    return this.configService.get('DATABASE_SYNCHRONIZE') as boolean;
  }

  /*
   * AuthConfig
   */
  getJwtAccessTokenSecret(): string {
    return this.configService.get('JWT_ACCESS_TOKEN_SECRET') as string;
  }
  getJwtAccessTokenExpiresIn(): string {
    return this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION') as string;
  }
  getJwtRefreshTokenSecret(): string {
    return this.configService.get('JWT_REFRESH_TOKEN_SECRET') as string;
  }
  getJwtRefreshTokenExpiresIn(): string {
    return this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION') as string;
  }
  getVerificationTokenSecret(): string {
    return this.configService.get('VERIFICATION_TOKEN_SECRET') as string;
  }
  getVerificationTokenExpiresIn(): string {
    return this.configService.get('VERIFICATION_TOKEN_EXPIRATION') as string;
  }
}

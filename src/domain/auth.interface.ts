export interface AuthConfig {
  getJwtAccessTokenSecret(): string;
  getJwtAccessTokenExpiresIn(): string;
  getJwtRefreshTokenSecret(): string;
  getJwtRefreshTokenExpiresIn(): string;
  getVerificationTokenSecret(): string;
  getVerificationTokenExpiresIn(): string;
}

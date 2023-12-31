import { registerAs } from '@nestjs/config';
import { IAuthConfig } from './config.interface';
import { IsString } from 'class-validator';
import validateConfig from 'src/utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  AUTH_JWT_SECRET: string;

  @IsString()
  AUTH_JWT_TOKEN_EXPIRES_IN: string;

  @IsString()
  AUTH_REFRESH_SECRET: string;

  @IsString()
  AUTH_REFRESH_TOKEN_EXPIRES_IN: string;
}

export default registerAs<IAuthConfig>('auth', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    jwtSecret: process.env.AUTH_JWT_SECRET,
    jwtExpires: process.env.AUTH_JWT_TOKEN_EXPIRES_IN,
    jwtRefreshSecret: process.env.AUTH_REFRESH_SECRET,
    jwtRefreshExpires: process.env.AUTH_REFRESH_TOKEN_EXPIRES_IN,
  };
});

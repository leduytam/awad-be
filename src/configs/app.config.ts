import validateConfig from 'src/utils/validate-config';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { registerAs } from '@nestjs/config';
import { IAppConfig } from './config.interface';

export enum EEnvironment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariablesValidator {
  @IsEnum(EEnvironment)
  @IsOptional()
  NODE_ENV: EEnvironment;

  @IsString()
  @IsOptional()
  WEB_FE_URL: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  PORT: number;
}

export default registerAs<IAppConfig>('app', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT ? +process.env.PORT : 3000,
    webFeUrl: process.env.WEB_FE_URL || 'http://localhost:3000',
  };
});

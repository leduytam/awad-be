import validateConfig from 'src/utils/validate-config';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { registerAs } from '@nestjs/config';
import { IAppConfig } from './config.interface';

enum EEnvironment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariablesValidator {
  @IsEnum(EEnvironment)
  @IsOptional()
  NODE_ENV: EEnvironment;

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
  };
});

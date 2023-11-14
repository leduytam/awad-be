export interface IAppConfig {
  webFeUrl: string;
  env: string;
  port: number;
}

export interface IDatabaseConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  autoLoadEntities: boolean;
  timezone: string;
  entities: string[];
  migrations: string[];
  ssl: {
    rejectUnauthorized: boolean;
    ca: string;
    key: string;
    cert: string;
  };
}

export interface IAuthConfig {
  jwtSecret: string;
  jwtExpires: string;
  jwtRefreshSecret: string;
  jwtRefreshExpires: string;
}

export interface IAllConfig {
  app: IAppConfig;
  database: IDatabaseConfig;
  auth: IAuthConfig;
}

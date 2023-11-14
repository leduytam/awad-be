import { IUserPayload } from 'src/auth/auth.interface';

export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;

      DATABASE_TYPE: string;
      DATABASE_HOST: string;
      DATABASE_PORT: string;
      DATABASE_USERNAME: string;
      DATABASE_PASSWORD: string;
      DATABASE_NAME: string;
      DATABASE_SYNCHRONIZE: string;
      DATABASE_TIMEZONE: string;
      DATABASE_SSL_ENABLED: string;
      DATABASE_REJECT_UNAUTHORIZED: string;
      DATABASE_CA: string;
      DATABASE_KEY: string;
      DATABASE_CERT: string;

      AUTH_JWT_SECRET: string;
      AUTH_JWT_TOKEN_EXPIRES_IN: string;
      AUTH_REFRESH_SECRET: string;
      AUTH_REFRESH_TOKEN_EXPIRES_IN: string;
    }
  }

  namespace Express {
    interface Request {
      user: IUserPayload;
    }
  }
}

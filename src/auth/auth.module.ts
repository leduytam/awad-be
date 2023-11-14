import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/models/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { IAllConfig } from 'src/configs/config.interface';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    IsExist,
    IsNotExist,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService<IAllConfig>) => ({
        secret: config.get('auth.jwtSecret', { infer: true }),
        signOptions: {
          expiresIn: config.get('auth.jwtExpires', { infer: true }),
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}

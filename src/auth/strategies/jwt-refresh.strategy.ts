import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { IAllConfig } from 'src/configs/config.interface';
import { IJwtPayload, IUserPayload } from '../auth.interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private configService: ConfigService<IAllConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      secretOrKey: configService.get('auth.jwtRefreshSecret', { infer: true }),
    });
  }

  public validate(payload: IJwtPayload): IUserPayload {
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}

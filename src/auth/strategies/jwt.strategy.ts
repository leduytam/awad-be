import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IAllConfig } from 'src/configs/config.interface';
import { IJwtPayload, IUserPayload } from '../auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService<IAllConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('auth.jwtSecret', { infer: true }),
    });
  }

  public validate(payload: IJwtPayload): IUserPayload {
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}

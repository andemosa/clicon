import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as cookie from 'cookie';
import { RequestUser } from './types/request-user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    const jwtSecret = config.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in the configuration');
    }
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: { headers: { cookie: string; }; }) => {
          if (!req.headers.cookie) return null;
          const cookies = cookie.parse(req.headers.cookie);
          return cookies['access_token'] ?? null;
        },
      ]),
      secretOrKey: jwtSecret,
    });
  }

  validate(payload: RequestUser) {
    return { id: payload.id, email: payload.email };
  }
}

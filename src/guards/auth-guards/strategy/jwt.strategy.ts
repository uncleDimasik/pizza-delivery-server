import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as cookieParser from 'cookie-parser';
import { UserCookieEntity } from '../../../user/entities/user.cookie.entity';

// some jwt best practices https://www.rfc-editor.org/rfc/rfc8725.html

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      jsonWebTokenOptions: { algorithms: ['HS256'] },
    });
  }

  async validate(user: UserCookieEntity) {
    if (!user) return false;
    return user;
  }
}

const cookieExtractor = (request: Request): string | null => {
  const isCookieTokenExist = !!request?.signedCookies?.token;
  if (!isCookieTokenExist) {
    console.log('Cookie not passed'); // TODO: log
    return null;
  }

  const unsignedCookieToken = cookieParser.signedCookie(
    request.signedCookies.token,
    process.env.COOKIE_SECRET,
  );
  return unsignedCookieToken || null;
};

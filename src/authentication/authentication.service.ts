import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginInput, RegisterInput } from './dto/login.input';
import { UserService } from '../user/user.service';
import { User } from '../@generated';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserCookieEntity } from '../user/entities/user.cookie.entity';
import { Role } from '../user/entities/role.enum';

const domain = process.env.WEB_APP_HOST;
const jwtExpiresSecond = process.env.JWT_EXPIRES_SECONDS;

const HTTP_ONLY_COOKIE = {
  maxAge: Number(jwtExpiresSecond) * 1000, // cookie lives same amount of time as jwt
  httpOnly: true,
  signed: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  domain,
};

const USERS_COOKIE = {
  maxAge: Number(jwtExpiresSecond) * 1000, // cookie lives same amount of time as jwt
  domain,
};

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userService.findOneByEmail({ email });
    if (!user) {
      throw new NotFoundException('Not found user');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }

  signIn(loginInput: LoginInput) {
    return this.userService.findOneByEmail({
      email: loginInput.email,
    });
  }

  async signUp(signUpInput: RegisterInput, role: Role = Role.USER) {
    const oldUser = await this.userService.findOneByEmail({
      email: signUpInput.email,
    });
    if (oldUser) {
      throw new BadRequestException(
        `User already exist ${signUpInput.email}`,
      );
    }
    return await this.userService.create({
      data: {
        email: signUpInput.email,
        name: signUpInput.name,
        password: signUpInput.password,
        phone: signUpInput.phone,
        roles: [role],
      },
    });
  }

  issueToken(user: UserCookieEntity, res) {
    const jwtExpiresMs = Number(jwtExpiresSecond) * 1000;
    const tokenExpires = Date.now() + jwtExpiresMs;
    const accessToken = this.jwtService.sign({
      sub: user.id,
      roles: user.roles,
    });
    // Do not log it
    // console.log('token ' + accessToken);
    // console.log('token-expires ' + tokenExpires.toString());
    res.cookie('token', accessToken, HTTP_ONLY_COOKIE);
    res.cookie(
      'token-expires',
      tokenExpires.toString(),
      USERS_COOKIE,
    );
  }
}

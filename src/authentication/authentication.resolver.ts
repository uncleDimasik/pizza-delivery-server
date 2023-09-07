import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticationService } from './authentication.service';
import { LoginInput, RegisterInput } from './dto/login.input';
import { User } from '../@generated';
import { SetAuthGuard } from '../guards/auth-guards/set-auth.guard';
import {
  HttpStatus,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CheckAuthGuard } from '../guards/auth-guards/check-auth.guard';

@Resolver(() => User)
export class AuthenticationResolver {
  constructor(
    private readonly authenticationService: AuthenticationService,
  ) {}

  @UseGuards(SetAuthGuard)
  @Mutation(() => User)
  signIn(
    @Args('loginInput')
    loginInput: LoginInput,
  ) {
    return this.authenticationService.signIn(loginInput);
  }

  @Mutation(() => User)
  async signUp(
    @Context() context,
    @Args('signUpInput')
    signUpInput: RegisterInput,
  ) {
    const newUser = await this.authenticationService.signUp(
      signUpInput,
    );

    this.authenticationService.issueToken(newUser, context.res);
    return newUser;
  }

  @UseGuards(CheckAuthGuard)
  @Mutation(() => String)
  async signOut(@Context() context) {
    const { req, res } = context;
    const token = req.signedCookies['token'];

    if (token) {
      // remove the token cookie from the response
      res.clearCookie('token');
      res.clearCookie('token-expires');
      return HttpStatus.OK;
    }

    throw new UnauthorizedException();
  }
}

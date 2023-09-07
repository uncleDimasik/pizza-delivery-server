import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationService } from '../../authentication/authentication.service';

@Injectable()
export class SetAuthGuard extends AuthGuard('local') {
  constructor(private authService: AuthenticationService) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const context_ = GqlExecutionContext.create(context);
    const request = context_.getContext();
    // should be the same name as args
    request.body = context_.getArgs().loginInput;
    return request;
  }

  handleRequest(error, user, info, context) {
    if (error || !user || info) {
      throw error || new UnauthorizedException();
    }

    const authContext = GqlExecutionContext.create(context);
    const { res } = authContext.getContext();
    this.authService.issueToken(user, res);

    return user;
  }
}

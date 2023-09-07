import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Reflector } from '@nestjs/core';
import { Role } from '../../user/entities/role.enum';

@Injectable()
export class CheckAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthenticationService,
  ) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const context_ = GqlExecutionContext.create(context);
    return context_.getContext().req;
  }

  handleRequest(error, user, info, context) {
    if (!user || info || error) {
      const context_ = GqlExecutionContext.create(context);
      const res = context_.getContext().res;

      res.clearCookie('token');
      res.clearCookie('token-expires');

      throw error || new UnauthorizedException();
    }
    const requireRoles = this.reflector.getAllAndOverride<Role[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );
    // if no roles pass
    if (requireRoles) {
      const isRoleExist = requireRoles.some((role) =>
        user.roles.includes(role),
      );
      if (!isRoleExist) {
        throw new ForbiddenException({
          message: `RequiredRoles ${requireRoles}`,
        });
      }
    }
    const authContext = GqlExecutionContext.create(context);
    const { res, req } = authContext.getContext();
    const tokenExpires = req?.cookies['token-expires'];
    const timeLeft = Math.floor((tokenExpires - Date.now()) / 1000);
    if (timeLeft < Number(process.env.JWT_EXPIRES_SECONDS) * 0.2) {
      // if less than 20% of the time is available
      //upd token
      // this.authService.issueToken(user, res);
      this.authService.issueToken(user, res);
    }
    return user;
  }
}

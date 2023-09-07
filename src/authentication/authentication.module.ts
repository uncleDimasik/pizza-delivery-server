import { Global, Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationResolver } from './authentication.resolver';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from '../guards/auth-guards/strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../guards/auth-guards/strategy/jwt.strategy';

@Global() // set to global for check authGuard
@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: Number(process.env.JWT_EXPIRES_SECONDS),
      },
    }),
  ],
  providers: [
    AuthenticationResolver,
    AuthenticationService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}

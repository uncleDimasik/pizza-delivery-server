import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { OrderService } from '../order/order.service';

@Module({
  providers: [UserResolver, UserService, OrderService],
  exports: [UserService],
})
export class UserModule {}

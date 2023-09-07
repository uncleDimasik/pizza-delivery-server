import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { OrderItemService } from '../order-item/order-item.service';
import { UserService } from '../user/user.service';

@Module({
  providers: [
    OrderResolver,
    OrderService,
    OrderItemService,
    UserService,
  ],
})
export class OrderModule {}

import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemResolver } from './order-item.resolver';
import { GoodService } from '../good/good.service';
import { CustomerDishService } from '../customer-dish/customer-dish.service';

@Module({
  providers: [
    OrderItemResolver,
    OrderItemService,
    GoodService,
    CustomerDishService,
  ],
})
export class OrderItemModule {}

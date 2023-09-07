import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantResolver } from './restaurant.resolver';
import { OrderService } from '../order/order.service';

@Module({
  providers: [RestaurantResolver, RestaurantService, OrderService],
})
export class RestaurantModule {}

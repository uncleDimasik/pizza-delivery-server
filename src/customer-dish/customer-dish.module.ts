import { Module } from '@nestjs/common';
import { CustomerDishService } from './customer-dish.service';
import { CustomerDishResolver } from './customer-dish.resolver';
import { DishService } from '../dish/dish.service';
import { OptionService } from '../option/option.service';
import { ToppingsService } from '../toppings/toppings.service';

@Module({
  providers: [
    CustomerDishResolver,
    CustomerDishService,
    DishService,
    OptionService,
    ToppingsService,
  ],
})
export class CustomerDishModule {}

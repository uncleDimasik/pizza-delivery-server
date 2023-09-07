import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { DishService } from '../dish/dish.service';
import { GoodService } from '../good/good.service';

@Module({
  providers: [
    CategoryResolver,
    CategoryService,
    DishService,
    GoodService,
  ],
})
export class CategoryModule {}

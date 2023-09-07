import { Module } from '@nestjs/common';
import { GoodService } from './good.service';
import { GoodResolver } from './good.resolver';
import { CategoryService } from '../category/category.service';

@Module({
  providers: [GoodResolver, GoodService, CategoryService],
})
export class GoodModule {}

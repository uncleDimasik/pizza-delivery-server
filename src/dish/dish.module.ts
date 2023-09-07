import { Module } from '@nestjs/common';
import { DishService } from './dish.service';
import { DishResolver } from './dish.resolver';
import { CategoryService } from '../category/category.service';
import { OptionService } from '../option/option.service';
import { IngredientService } from '../ingredient/ingredient.service';

@Module({
  providers: [
    DishResolver,
    DishService,
    CategoryService,
    OptionService,
    IngredientService,
  ],
})
export class DishModule {}

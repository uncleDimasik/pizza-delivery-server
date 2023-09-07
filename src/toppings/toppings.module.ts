import { Module } from '@nestjs/common';
import { ToppingsService } from './toppings.service';
import { ToppingsResolver } from './toppings.resolver';
import { IngredientService } from '../ingredient/ingredient.service';
import { OptionService } from '../option/option.service';

@Module({
  providers: [
    ToppingsResolver,
    ToppingsService,
    IngredientService,
    OptionService,
  ],
})
export class ToppingsModule {}

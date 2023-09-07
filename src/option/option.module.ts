import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionResolver } from './option.resolver';
import { ToppingsService } from '../toppings/toppings.service';

@Module({
  providers: [OptionResolver, OptionService, ToppingsService],
})
export class OptionModule {}

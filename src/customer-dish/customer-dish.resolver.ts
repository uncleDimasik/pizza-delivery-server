import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CustomerDishService } from './customer-dish.service';
import {
  CreateOneCustomerDishArgs,
  CustomerDish,
  DeleteOneCustomerDishArgs,
  FindManyCustomerDishArgs,
  FindUniqueCustomerDishArgs,
  UpdateOneCustomerDishArgs,
} from '../@generated';
import { UseGuards } from '@nestjs/common';
import { CheckAuthGuard } from '../guards/auth-guards/check-auth.guard';
import { DishService } from '../dish/dish.service';
import { ToppingsService } from '../toppings/toppings.service';
import { OptionService } from '../option/option.service';

@Resolver(() => CustomerDish)
export class CustomerDishResolver {
  constructor(
    private readonly customerDishService: CustomerDishService,
    private readonly dishService: DishService,
    private readonly toppingService: ToppingsService,
    private readonly optionService: OptionService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @Mutation(() => CustomerDish)
  createCustomerDish(
    @Args()
    createCustomerDishInput: CreateOneCustomerDishArgs,
  ) {
    return this.customerDishService.create(createCustomerDishInput);
  }

  @UseGuards(CheckAuthGuard)
  @Query(() => [CustomerDish])
  customerDishes(
    @Args() findManyCustomerDishArgs: FindManyCustomerDishArgs,
  ) {
    return this.customerDishService.findAll(findManyCustomerDishArgs);
  }

  @ResolveField()
  async parentDish(@Parent() customerDish: CustomerDish) {
    return this.dishService.findOne({
      where: {
        id: customerDish.dishId,
      },
    });
  }
  @ResolveField()
  async selectedOption(@Parent() customerDish: CustomerDish) {
    return this.optionService.findOne({
      where: {
        id: customerDish.optionsId,
      },
    });
  }

  @ResolveField()
  async selectedToppings(@Parent() customerDish: CustomerDish) {
    return this.toppingService.findAll({
      where: {
        customerDishes: {
          some: {
            id: {
              equals: customerDish.id,
            },
          },
        },
      },
    });
  }

  @UseGuards(CheckAuthGuard)
  @Query(() => CustomerDish)
  customerDish(
    @Args() findUniqueCustomerDishArgs: FindUniqueCustomerDishArgs,
  ) {
    return this.customerDishService.findOne(
      findUniqueCustomerDishArgs,
    );
  }
  @UseGuards(CheckAuthGuard)
  @Mutation(() => CustomerDish)
  updateCustomerDish(
    @Args()
    updateCustomerDishInput: UpdateOneCustomerDishArgs,
  ) {
    return this.customerDishService.update(updateCustomerDishInput);
  }
  @UseGuards(CheckAuthGuard)
  @Mutation(() => CustomerDish)
  removeCustomerDish(
    @Args() deleteOneCustomerDishArgs: DeleteOneCustomerDishArgs,
  ) {
    return this.customerDishService.remove(deleteOneCustomerDishArgs);
  }
}

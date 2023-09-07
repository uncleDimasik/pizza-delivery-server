import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ToppingsService } from './toppings.service';
import {
  CreateOneToppingArgs,
  DeleteOneToppingArgs,
  FindManyToppingArgs,
  FindUniqueToppingArgs,
  Topping,
  UpdateOneToppingArgs,
} from '../@generated';
import { Roles } from '../guards/role.decorator';
import { Role } from '../user/entities/role.enum';
import { UseGuards } from '@nestjs/common';
import { CheckAuthGuard } from '../guards/auth-guards/check-auth.guard';
import { IngredientService } from '../ingredient/ingredient.service';
import { OptionService } from '../option/option.service';

@Resolver(() => Topping)
export class ToppingsResolver {
  constructor(
    private readonly toppingsService: ToppingsService,
    private readonly ingredientService: IngredientService,
    private readonly optionService: OptionService,
  ) {}

  @Roles(Role.ADMIN)
  @UseGuards(CheckAuthGuard)
  @Mutation(() => Topping)
  createTopping(@Args() createToppingInput: CreateOneToppingArgs) {
    return this.toppingsService.create(createToppingInput);
  }

  @Query(() => [Topping])
  toppings(@Args() findManyToppingArgs: FindManyToppingArgs) {
    return this.toppingsService.findAll(findManyToppingArgs);
  }

  @Query(() => Topping)
  topping(@Args() findUniqueToppingArgs: FindUniqueToppingArgs) {
    return this.toppingsService.findOne(findUniqueToppingArgs);
  }

  @ResolveField()
  async ingredientLabel(@Parent() toppings: Topping) {
    return this.ingredientService.findOne({
      where: {
        id: toppings.ingredientLabelId,
      },
    });
  }

  @ResolveField()
  async option(@Parent() toppings: Topping) {
    return this.optionService.findOne({
      where: {
        id: toppings.optionId,
      },
    });
  }

  @Roles(Role.ADMIN)
  @UseGuards(CheckAuthGuard)
  @Mutation(() => Topping)
  updateTopping(@Args() updateToppingInput: UpdateOneToppingArgs) {
    return this.toppingsService.update(updateToppingInput);
  }

  @Roles(Role.ADMIN)
  @UseGuards(CheckAuthGuard)
  @Mutation(() => Topping)
  removeTopping(@Args() deleteOneToppingArgs: DeleteOneToppingArgs) {
    return this.toppingsService.remove(deleteOneToppingArgs);
  }
}

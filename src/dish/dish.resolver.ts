import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { DishService } from './dish.service';
import {
  CreateOneDishArgs,
  DeleteOneDishArgs,
  Dish,
  FindManyDishArgs,
  FindManyOptionsArgs,
  FindUniqueDishArgs,
  OptionsOrderByRelationAggregateInput,
  OptionsOrderByWithRelationInput,
  UpdateOneDishArgs,
} from '../@generated';
import { Roles } from '../guards/role.decorator';
import { Role } from '../user/entities/role.enum';
import { UseGuards } from '@nestjs/common';
import { CheckAuthGuard } from '../guards/auth-guards/check-auth.guard';
import { CategoryService } from '../category/category.service';
import { OptionService } from '../option/option.service';
import { IngredientService } from '../ingredient/ingredient.service';

@Resolver(() => Dish)
export class DishResolver {
  constructor(
    private readonly dishService: DishService,
    private readonly categoryService: CategoryService,
    private readonly optionService: OptionService,
    private readonly ingredientService: IngredientService,
  ) {}

  @Roles(Role.ADMIN)
  @UseGuards(CheckAuthGuard)
  @Mutation(() => Dish)
  createDish(@Args() createDishInput: CreateOneDishArgs) {
    return this.dishService.create(createDishInput);
  }

  @Query(() => [Dish])
  dishes(@Args() findManyDishArgs: FindManyDishArgs) {
    return this.dishService.findAll(findManyDishArgs);
  }

  @ResolveField()
  async category(@Parent() dish: Dish) {
    return this.categoryService.findOne({
      where: {
        id: dish.categoryId,
      },
    });
  }

  @ResolveField()
  async options(@Parent() dish: Dish) {
    return this.optionService.findAll({
      orderBy: [
        {
          price: 'asc',
        },
      ],
      where: {
        dishes: {
          some: {
            id: {
              equals: dish.id,
            },
          },
        },
      },
    });
  }

  @ResolveField()
  async ingradients(@Parent() dish: Dish) {
    return this.ingredientService.findAll({
      where: {
        dishes: {
          some: {
            id: {
              equals: dish.id,
            },
          },
        },
      },
    });
  }

  @Query(() => Dish)
  dish(@Args() findUniqueDishArgs: FindUniqueDishArgs) {
    return this.dishService.findOne(findUniqueDishArgs);
  }

  @Roles(Role.ADMIN)
  @UseGuards(CheckAuthGuard)
  @Mutation(() => Dish)
  updateDish(@Args() updateDishInput: UpdateOneDishArgs) {
    return this.dishService.update(updateDishInput);
  }

  @Roles(Role.ADMIN)
  @UseGuards(CheckAuthGuard)
  @Mutation(() => Dish)
  removeDish(@Args() deleteOneDishArgs: DeleteOneDishArgs) {
    return this.dishService.remove(deleteOneDishArgs);
  }
}

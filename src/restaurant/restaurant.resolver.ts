import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { RestaurantService } from './restaurant.service';
import {
  CreateOneRestaurantArgs,
  DeleteOneRestaurantArgs,
  FindManyRestaurantArgs,
  FindUniqueRestaurantArgs,
  Options,
  Restaurant,
  UpdateOneRestaurantArgs,
} from '../@generated';
import { Roles } from '../guards/role.decorator';
import { Role } from '../user/entities/role.enum';
import { UseGuards } from '@nestjs/common';
import { CheckAuthGuard } from '../guards/auth-guards/check-auth.guard';
import { OrderService } from '../order/order.service';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly orderService: OrderService,
  ) {}

  @Mutation(() => Restaurant)
  createRestaurant(
    @Args()
    createRestaurantInput: CreateOneRestaurantArgs,
  ) {
    return this.restaurantService.create(createRestaurantInput);
  }

  @Query(() => [Restaurant])
  restaurants(
    @Args() findManyRestaurantArgs: FindManyRestaurantArgs,
  ) {
    return this.restaurantService.findAll(findManyRestaurantArgs);
  }

  @ResolveField()
  async order(@Parent() restaurant: Restaurant) {
    const k = await this.orderService.findAll({
      where: {
        restaurantId: {
          equals: restaurant.id,
        },
      },
    });
    return k;
  }

  @Query(() => Restaurant)
  restaurant(
    @Args() findUniqueRestaurantArgs: FindUniqueRestaurantArgs,
  ) {
    return this.restaurantService.findOne(findUniqueRestaurantArgs);
  }

  @Roles(Role.ADMIN)
  @UseGuards(CheckAuthGuard)
  @Mutation(() => Restaurant)
  updateRestaurant(
    @Args() updateOneRestaurantArgs: UpdateOneRestaurantArgs,
  ) {
    return this.restaurantService.update(updateOneRestaurantArgs);
  }

  @Roles(Role.ADMIN)
  @UseGuards(CheckAuthGuard)
  @Mutation(() => Restaurant)
  removeRestaurant(
    @Args() deleteOneRestaurantArgs: DeleteOneRestaurantArgs,
  ) {
    return this.restaurantService.remove(deleteOneRestaurantArgs);
  }
}

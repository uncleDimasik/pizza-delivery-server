import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { OrderItemService } from './order-item.service';
import {
  Category,
  CreateOneOrderItemArgs,
  DeleteOneOrderItemArgs,
  FindManyOrderItemArgs,
  FindUniqueOrderItemArgs,
  OrderItem,
  UpdateOneOrderItemArgs,
} from '../@generated';
import { UseGuards } from '@nestjs/common';
import { CheckAuthGuard } from '../guards/auth-guards/check-auth.guard';
import { GoodService } from '../good/good.service';
import { CustomerDishService } from '../customer-dish/customer-dish.service';

@Resolver(() => OrderItem)
export class OrderItemResolver {
  constructor(
    private readonly orderItemService: OrderItemService,
    private readonly goodService: GoodService,
    private readonly customerDishService: CustomerDishService,
  ) {}
  @UseGuards(CheckAuthGuard)
  @Mutation(() => OrderItem)
  createOrderItem(
    @Args() createOrderItemInput: CreateOneOrderItemArgs,
  ) {
    return this.orderItemService.create(createOrderItemInput);
  }
  @UseGuards(CheckAuthGuard)
  @Query(() => [OrderItem])
  orderItems(@Args() findManyOrderItemArgs: FindManyOrderItemArgs) {
    return this.orderItemService.findAll(findManyOrderItemArgs);
  }

  @ResolveField()
  async good(@Parent() orderItem: OrderItem) {
    if (!orderItem.goodId) {
      return;
    }
    return this.goodService.findOne({
      where: {
        id: orderItem.goodId,
      },
    });
  }

  @ResolveField()
  async customerDish(@Parent() orderItem: OrderItem) {
    if (!orderItem.customerDishId) {
      return;
    }
    return this.customerDishService.findOne({
      where: {
        id: orderItem.customerDishId,
      },
    });
  }

  @UseGuards(CheckAuthGuard)
  @Query(() => OrderItem)
  orderItem(
    @Args() findUniqueOrderItemArgs: FindUniqueOrderItemArgs,
  ) {
    return this.orderItemService.findOne(findUniqueOrderItemArgs);
  }
  @UseGuards(CheckAuthGuard)
  @Mutation(() => OrderItem)
  updateOrderItem(
    @Args() updateOrderItemInput: UpdateOneOrderItemArgs,
  ) {
    return this.orderItemService.update(updateOrderItemInput);
  }
  @UseGuards(CheckAuthGuard)
  @Mutation(() => OrderItem)
  removeOrderItem(
    @Args() deleteOneOrderItemArgs: DeleteOneOrderItemArgs,
  ) {
    return this.orderItemService.remove(deleteOneOrderItemArgs);
  }
}

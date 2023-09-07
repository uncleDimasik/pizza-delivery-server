import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { OrderService } from './order.service';
import {
  CreateOneOrderArgs,
  DeleteOneOrderArgs,
  FindManyOrderArgs,
  FindUniqueOrderArgs,
  Order,
  Restaurant,
  UpdateOneOrderArgs,
} from '../@generated';
import { Roles } from '../guards/role.decorator';
import { Role } from '../user/entities/role.enum';
import { UseGuards } from '@nestjs/common';
import { CheckAuthGuard } from '../guards/auth-guards/check-auth.guard';
import { CurrentUserId } from '../guards/user.decorator';
import { CreateOneOrderArgsDto } from './dto/createOrder.input';
import { UserService } from '../user/user.service';
import { OrderItemService } from '../order-item/order-item.service';

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderItemService: OrderItemService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @Mutation(() => Order)
  async createOrder(
    @Args() createOrderInput: CreateOneOrderArgsDto,
    @CurrentUserId() user: any,
  ) {
    const orderData: CreateOneOrderArgs = {
      data: {
        ...createOrderInput.data,
        user: {
          connect: {
            id: user.sub,
          },
        },
      },
    };
    return this.orderService.create(orderData);
  }

  @UseGuards(CheckAuthGuard)
  @Query(() => [Order])
  async orders(@Args() findManyOrderArgs: FindManyOrderArgs) {
    return this.orderService.findAll(findManyOrderArgs);
  }

  @UseGuards(CheckAuthGuard)
  @Query(() => Number)
  async countOrders(@Args() findManyOrderArgs: FindManyOrderArgs) {
    return this.orderService.numberOfOrders(findManyOrderArgs);
  }

  @UseGuards(CheckAuthGuard)
  @Query(() => Order)
  async order(@Args() findUniqueOrderArgs: FindUniqueOrderArgs) {
    return this.orderService.findOne(findUniqueOrderArgs);
  }

  @ResolveField()
  async items(@Parent() order: Order) {
    const k = await this.orderItemService.findAll({
      where: {
        orderId: {
          equals: order.id,
        },
      },
    });
    return k;
  }

  @ResolveField()
  async user(@Parent() order: Order) {
    const k = await this.userService.findOneById({
      id: order.userId,
    });
    return k;
  }

  @Roles(Role.ADMIN)
  @UseGuards(CheckAuthGuard)
  @Mutation(() => Order)
  async updateOrder(@Args() updateOrderInput: UpdateOneOrderArgs) {
    return this.orderService.update(updateOrderInput);
  }
  @Roles(Role.ADMIN)
  @UseGuards(CheckAuthGuard)
  @Mutation(() => Order)
  async removeOrder(@Args() deleteOneOrderArgs: DeleteOneOrderArgs) {
    return this.orderService.remove(deleteOneOrderArgs);
  }
}

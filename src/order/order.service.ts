import { Injectable } from '@nestjs/common';
import {
  CreateOneOrderArgs,
  DeleteOneOrderArgs,
  FindManyOrderArgs,
  FindUniqueOrderArgs,
  UpdateOneOrderArgs,
} from '../@generated';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  create(createOrderInput: CreateOneOrderArgs) {
    return this.prisma.order.create(createOrderInput);
  }

  findAll(findManyOrderArgs: FindManyOrderArgs) {
    return this.prisma.order.findMany(findManyOrderArgs);
  }

  numberOfOrders(findManyOrderArgs: FindManyOrderArgs) {
    return this.prisma.order.count(findManyOrderArgs);
  }

  findOne(order: FindUniqueOrderArgs) {
    return this.prisma.order.findUnique(order);
  }

  update(order: UpdateOneOrderArgs) {
    return this.prisma.order.update(order);
  }

  remove(order: DeleteOneOrderArgs) {
    return this.prisma.order.delete(order);
  }
}

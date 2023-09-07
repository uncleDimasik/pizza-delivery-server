import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateOneOrderItemArgs,
  DeleteOneOrderItemArgs,
  FindManyOrderItemArgs,
  FindUniqueOrderItemArgs,
  UpdateOneOrderItemArgs,
} from '../@generated';

@Injectable()
export class OrderItemService {
  constructor(private prisma: PrismaService) {}
  create(createOrderItemInput: CreateOneOrderItemArgs) {
    this.prisma.orderItem.create(createOrderItemInput);
  }

  findAll(findManyOrderItemArgs: FindManyOrderItemArgs) {
    return this.prisma.orderItem.findMany(findManyOrderItemArgs);
  }

  findOne(findUniqueOrderItemArgs: FindUniqueOrderItemArgs) {
    return this.prisma.orderItem.findUnique(findUniqueOrderItemArgs);
  }

  update(updateOrderItemInput: UpdateOneOrderItemArgs) {
    return this.prisma.orderItem.update(updateOrderItemInput);
  }

  remove(deleteOneOrderItemArgs: DeleteOneOrderItemArgs) {
    return this.prisma.orderItem.delete(deleteOneOrderItemArgs);
  }
}

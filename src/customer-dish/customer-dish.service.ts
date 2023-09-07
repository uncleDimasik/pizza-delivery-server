import { Injectable } from '@nestjs/common';
import {
  CreateOneCustomerDishArgs,
  DeleteOneCustomerDishArgs,
  FindManyCustomerDishArgs,
  FindUniqueCustomerDishArgs,
  UpdateOneCustomerDishArgs,
} from '../@generated';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomerDishService {
  constructor(private prisma: PrismaService) {}

  create(createCustomerDishInput: CreateOneCustomerDishArgs) {
    return this.prisma.customerDish.create(createCustomerDishInput);
  }

  findAll(findManyCustomerDishArgs: FindManyCustomerDishArgs) {
    return this.prisma.customerDish.findMany(
      findManyCustomerDishArgs,
    );
  }

  findOne(findUniqueCustomerDishArgs: FindUniqueCustomerDishArgs) {
    return this.prisma.customerDish.findUnique(
      findUniqueCustomerDishArgs,
    );
  }

  update(updateCustomerDishInput: UpdateOneCustomerDishArgs) {
    return this.prisma.customerDish.update(updateCustomerDishInput);
  }

  remove(deleteOneCustomerDishArgs: DeleteOneCustomerDishArgs) {
    return this.prisma.customerDish.delete(deleteOneCustomerDishArgs);
  }
}

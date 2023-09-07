import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateOneToppingArgs,
  DeleteOneToppingArgs,
  FindManyToppingArgs,
  FindUniqueToppingArgs,
  UpdateOneToppingArgs,
} from '../@generated';

@Injectable()
export class ToppingsService {
  constructor(private prisma: PrismaService) {}

  create(createToppingInput: CreateOneToppingArgs) {
    return this.prisma.topping.create(createToppingInput);
  }

  findAll(findManyToppingArgs: FindManyToppingArgs) {
    return this.prisma.topping.findMany(findManyToppingArgs);
  }

  findOne(topping: FindUniqueToppingArgs) {
    return this.prisma.topping.findUnique(topping);
  }

  update(updateToppingInput: UpdateOneToppingArgs) {
    return this.prisma.topping.update(updateToppingInput);
  }

  remove(topping: DeleteOneToppingArgs) {
    return this.prisma.topping.delete(topping);
  }
}

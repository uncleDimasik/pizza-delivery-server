import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateOneRestaurantArgs,
  DeleteOneRestaurantArgs,
  FindManyRestaurantArgs,
  FindUniqueRestaurantArgs,
  UpdateOneRestaurantArgs,
} from '../@generated';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  create(createRestaurantInput: CreateOneRestaurantArgs) {
    return this.prisma.restaurant.create(createRestaurantInput);
  }

  findAll(findManyRestaurantArgs: FindManyRestaurantArgs) {
    return this.prisma.restaurant.findMany(findManyRestaurantArgs);
  }

  findOne(restaurant: FindUniqueRestaurantArgs) {
    return this.prisma.restaurant.findUnique(restaurant);
  }

  update(restaurant: UpdateOneRestaurantArgs) {
    return this.prisma.restaurant.update(restaurant);
  }

  remove(restaurant: DeleteOneRestaurantArgs) {
    return this.prisma.restaurant.delete(restaurant);
  }
}

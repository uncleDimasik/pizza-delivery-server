import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateOneDishArgs,
  DeleteOneDishArgs,
  FindManyDishArgs,
  FindUniqueDishArgs,
  UpdateOneDishArgs,
} from '../@generated';
import { slug } from '../utils/slug';

@Injectable()
export class DishService {
  constructor(private prisma: PrismaService) {}

  create(createOneDishArgs: CreateOneDishArgs) {
    createOneDishArgs.data.slug = slug(createOneDishArgs.data.name);
    return this.prisma.dish.create(createOneDishArgs);
  }

  findAll(dish: FindManyDishArgs) {
    return this.prisma.dish.findMany(dish);
  }

  findOne(dish: FindUniqueDishArgs) {
    return this.prisma.dish.findUnique(dish);
  }

  update(updateOneDishArgs: UpdateOneDishArgs) {
    if (updateOneDishArgs.data.slug) {
      updateOneDishArgs.data.slug = slug(updateOneDishArgs.data.name);
    }
    return this.prisma.dish.update(updateOneDishArgs);
  }

  remove(dish: DeleteOneDishArgs) {
    return this.prisma.dish.delete(dish);
  }
}

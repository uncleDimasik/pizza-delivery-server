import { Injectable } from '@nestjs/common';
import {
  CreateOneGoodArgs,
  DeleteOneGoodArgs,
  FindManyGoodArgs,
  FindUniqueGoodArgs,
  UpdateOneGoodArgs,
} from '../@generated';
import { PrismaService } from '../prisma/prisma.service';
import { slug } from '../utils/slug';

@Injectable()
export class GoodService {
  constructor(private prisma: PrismaService) {}

  create(createGoodInput: CreateOneGoodArgs) {
    createGoodInput.data.slug = slug(createGoodInput.data.name);
    return this.prisma.good.create(createGoodInput);
  }

  findAll(findManyGoodArgs: FindManyGoodArgs) {
    return this.prisma.good.findMany(findManyGoodArgs);
  }

  findOne(good: FindUniqueGoodArgs) {
    return this.prisma.good.findUnique(good);
  }

  update(updateGoodInput: UpdateOneGoodArgs) {
    if (updateGoodInput.data.slug) {
      updateGoodInput.data.slug = slug(updateGoodInput.data.name);
    }
    return this.prisma.good.update(updateGoodInput);
  }

  remove(good: DeleteOneGoodArgs) {
    return this.prisma.good.delete(good);
  }
}

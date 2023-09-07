import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateOneOptionsArgs,
  DeleteOneOptionsArgs,
  FindManyOptionsArgs,
  FindUniqueOptionsArgs,
  UpdateOneOptionsArgs,
} from '../@generated';

@Injectable()
export class OptionService {
  constructor(private prisma: PrismaService) {}

  create(createOptionInput: CreateOneOptionsArgs) {
    return this.prisma.options.create(createOptionInput);
  }

  findAll(findManyOptionsArgs: FindManyOptionsArgs) {
    return this.prisma.options.findMany(findManyOptionsArgs);
  }

  findOne(findUniqueOptionsArgs: FindUniqueOptionsArgs) {
    return this.prisma.options.findUnique(findUniqueOptionsArgs);
  }

  async update(updateOptionInput: UpdateOneOptionsArgs) {
    return this.prisma.options.update(updateOptionInput);
  }

  remove(deleteOneOptionsArgs: DeleteOneOptionsArgs) {
    return this.prisma.options.delete(deleteOneOptionsArgs);
  }
}

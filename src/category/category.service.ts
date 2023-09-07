import { Injectable } from '@nestjs/common';
import {
  CreateOneCategoryArgs,
  DeleteOneCategoryArgs,
  FindManyCategoryArgs,
  FindUniqueCategoryArgs,
  UpdateOneCategoryArgs,
} from '../@generated';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  create(createCategoryInput: CreateOneCategoryArgs) {
    return this.prisma.category.create(createCategoryInput);
  }

  findAll(findManyCategoryArgs: FindManyCategoryArgs) {
    return this.prisma.category.findMany(findManyCategoryArgs);
  }

  findOne(category: FindUniqueCategoryArgs) {
    return this.prisma.category.findUnique(category);
  }

  update(category: UpdateOneCategoryArgs) {
    return this.prisma.category.update(category);
  }

  remove(deleteOneCategoryArgs: DeleteOneCategoryArgs) {
    return this.prisma.category.delete(deleteOneCategoryArgs);
  }
}

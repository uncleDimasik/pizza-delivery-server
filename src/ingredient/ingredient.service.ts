import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateOneIngradientLabelArgs,
  DeleteOneIngradientLabelArgs,
  FindManyIngradientLabelArgs,
  FindUniqueIngradientLabelArgs,
  UpdateOneIngradientLabelArgs,
} from '../@generated';

@Injectable()
export class IngredientService {
  constructor(private prisma: PrismaService) {}

  create(createIngredientInput: CreateOneIngradientLabelArgs) {
    return this.prisma.ingradientLabel.create(createIngredientInput);
  }

  findAll(findManyIngradientLabelArgs: FindManyIngradientLabelArgs) {
    return this.prisma.ingradientLabel.findMany(
      findManyIngradientLabelArgs,
    );
  }

  findOne(ingredient: FindUniqueIngradientLabelArgs) {
    return this.prisma.ingradientLabel.findUnique(ingredient);
  }

  update(updateIngredientInput: UpdateOneIngradientLabelArgs) {
    return this.prisma.ingradientLabel.update(updateIngredientInput);
  }

  remove(ingredient: DeleteOneIngradientLabelArgs) {
    return this.prisma.ingradientLabel.delete(ingredient);
  }
}

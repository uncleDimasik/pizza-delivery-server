import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IngredientService } from './ingredient.service';
import {
  CreateOneIngradientLabelArgs,
  DeleteOneIngradientLabelArgs,
  FindManyIngradientLabelArgs,
  FindUniqueIngradientLabelArgs,
  IngradientLabel,
  UpdateOneIngradientLabelArgs,
} from '../@generated';
import { Roles } from '../guards/role.decorator';
import { Role } from '../user/entities/role.enum';
import { UseGuards } from '@nestjs/common';
import { CheckAuthGuard } from '../guards/auth-guards/check-auth.guard';

@Resolver(() => IngradientLabel)
export class IngredientResolver {
  constructor(
    private readonly ingredientService: IngredientService,
  ) {}
  @Roles(Role.ADMIN)
  @UseGuards(CheckAuthGuard)
  @Mutation(() => IngradientLabel)
  createIngredient(
    @Args()
    createIngredientInput: CreateOneIngradientLabelArgs,
  ) {
    return this.ingredientService.create(createIngredientInput);
  }

  @Query(() => [IngradientLabel])
  ingredients(
    @Args() findManyIngradientLabelArgs: FindManyIngradientLabelArgs,
  ) {
    return this.ingredientService.findAll(
      findManyIngradientLabelArgs,
    );
  }

  @Query(() => IngradientLabel)
  ingredient(
    @Args()
    findUniqueIngradientLabelArgs: FindUniqueIngradientLabelArgs,
  ) {
    return this.ingredientService.findOne(
      findUniqueIngradientLabelArgs,
    );
  }
  @Roles(Role.ADMIN)
  @UseGuards(CheckAuthGuard)
  @Mutation(() => IngradientLabel)
  updateIngredient(
    @Args()
    updateIngredientInput: UpdateOneIngradientLabelArgs,
  ) {
    return this.ingredientService.update(updateIngredientInput);
  }
  @Roles(Role.ADMIN)
  @UseGuards(CheckAuthGuard)
  @Mutation(() => IngradientLabel)
  removeIngredient(
    @Args()
    deleteOneIngradientLabelArgs: DeleteOneIngradientLabelArgs,
  ) {
    return this.ingredientService.remove(
      deleteOneIngradientLabelArgs,
    );
  }
}

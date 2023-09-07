import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  CreateOneGoodArgs,
  DeleteOneGoodArgs,
  Dish,
  FindManyGoodArgs,
  FindUniqueGoodArgs,
  Good,
  UpdateOneGoodArgs,
} from '../@generated';
import { GoodService } from './good.service';
import { Roles } from '../guards/role.decorator';
import { Role } from '../user/entities/role.enum';
import { UseGuards } from '@nestjs/common';
import { CheckAuthGuard } from '../guards/auth-guards/check-auth.guard';
import { CategoryService } from '../category/category.service';

@Resolver(() => Good)
export class GoodResolver {
  constructor(
    private readonly goodService: GoodService,
    private readonly categoryService: CategoryService,
  ) {}
  @Roles(Role.ADMIN)
  @UseGuards(CheckAuthGuard)
  @Mutation(() => Good)
  createGood(@Args() createGoodInput: CreateOneGoodArgs) {
    return this.goodService.create(createGoodInput);
  }

  @ResolveField()
  async category(@Parent() good: Good) {
    return this.categoryService.findOne({
      where: {
        id: good.categoryId,
      },
    });
  }
  @Query(() => [Good])
  goods(@Args() findManyGoodArgs: FindManyGoodArgs) {
    return this.goodService.findAll(findManyGoodArgs);
  }

  @Query(() => Good)
  good(@Args() findUniqueGoodArgs: FindUniqueGoodArgs) {
    return this.goodService.findOne(findUniqueGoodArgs);
  }
  @Roles(Role.ADMIN)
  @UseGuards(CheckAuthGuard)
  @Mutation(() => Good)
  updateGood(@Args() updateGoodInput: UpdateOneGoodArgs) {
    return this.goodService.update(updateGoodInput);
  }
  @Roles(Role.ADMIN)
  @UseGuards(CheckAuthGuard)
  @Mutation(() => Good)
  removeGood(@Args() deleteOneGoodArgs: DeleteOneGoodArgs) {
    return this.goodService.remove(deleteOneGoodArgs);
  }
}

import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CategoryService } from './category.service';
import {
  Category,
  CreateOneCategoryArgs,
  DeleteOneCategoryArgs,
  FindManyCategoryArgs,
  FindUniqueCategoryArgs,
  UpdateOneCategoryArgs,
} from '../@generated';
import { UseGuards } from '@nestjs/common';
import { CheckAuthGuard } from '../guards/auth-guards/check-auth.guard';
import { Role } from '../user/entities/role.enum';
import { Roles } from '../guards/role.decorator';
import { DishService } from '../dish/dish.service';
import { GoodService } from '../good/good.service';

@Resolver((of) => Category)
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly dishService: DishService,
    private readonly goodService: GoodService,
  ) {}

  @Mutation(() => Category)
  createCategory(
    @Args()
    createCategory: CreateOneCategoryArgs,
  ) {
    return this.categoryService.create(createCategory);
  }

  @Query(() => [Category])
  categories(@Args() findManyCategoryArgs: FindManyCategoryArgs) {
    return this.categoryService.findAll(findManyCategoryArgs);
  }

  @Query(() => Category)
  category(@Args() findUniqueCategoryArgs: FindUniqueCategoryArgs) {
    return this.categoryService.findOne(findUniqueCategoryArgs);
  }

  @ResolveField()
  async dishes(@Parent() category: Category) {
    this.dishService.findAll({
      where: {
        categoryId: {
          contains: category.id,
        },
      },
    });
  }

  @ResolveField()
  async goods(@Parent() category: Category) {
    return this.goodService.findAll({
      where: {
        categoryId: {
          contains: category.id,
        },
      },
    });
  }

  @Roles(Role.ADMIN)
  @UseGuards(CheckAuthGuard)
  @Mutation(() => Category)
  updateCategory(
    @Args() updateOneCategoryArgs: UpdateOneCategoryArgs,
  ) {
    return this.categoryService.update(updateOneCategoryArgs);
  }

  @Roles(Role.ADMIN)
  @UseGuards(CheckAuthGuard)
  @Mutation(() => Category)
  removeCategory(
    @Args() deleteOneCategoryArgs: DeleteOneCategoryArgs,
  ) {
    return this.categoryService.remove(deleteOneCategoryArgs);
  }
}

import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { OptionService } from './option.service';
import {
  CreateOneOptionsArgs,
  DeleteOneOptionsArgs,
  FindManyOptionsArgs,
  FindUniqueOptionsArgs,
  Options,
  UpdateOneOptionsArgs,
} from '../@generated';
import { Roles } from '../guards/role.decorator';
import { Role } from '../user/entities/role.enum';
import { UseGuards } from '@nestjs/common';
import { CheckAuthGuard } from '../guards/auth-guards/check-auth.guard';
import { ToppingsService } from '../toppings/toppings.service';

@Resolver(() => Options)
export class OptionResolver {
  constructor(
    private readonly optionService: OptionService,
    private readonly toppingsService: ToppingsService,
  ) {}

  @Roles(Role.ADMIN)
  @UseGuards(CheckAuthGuard)
  @Mutation(() => Options)
  createOption(@Args() createOptionInput: CreateOneOptionsArgs) {
    return this.optionService.create(createOptionInput);
  }

  @Query(() => [Options])
  options(@Args() findManyOptionsArgs: FindManyOptionsArgs) {
    return this.optionService.findAll(findManyOptionsArgs);
  }

  @Query(() => Options)
  option(@Args() findUniqueOptionsArgs: FindUniqueOptionsArgs) {
    return this.optionService.findOne(findUniqueOptionsArgs);
  }

  @ResolveField()
  async toppings(@Parent() options: Options) {
    const k = await this.toppingsService.findAll({
      where: {
        optionId: {
          equals: options.id,
        },
      },
    });
    return k;
  }

  @Roles(Role.ADMIN)
  @UseGuards(CheckAuthGuard)
  @Mutation(() => Options)
  async updateOption(
    @Args() updateOptionInput: UpdateOneOptionsArgs,
  ) {
    return await this.optionService.update(updateOptionInput);
  }

  @Roles(Role.ADMIN)
  @UseGuards(CheckAuthGuard)
  @Mutation(() => Options)
  removeOption(@Args() deleteOneOptionsArgs: DeleteOneOptionsArgs) {
    return this.optionService.remove(deleteOneOptionsArgs);
  }
}

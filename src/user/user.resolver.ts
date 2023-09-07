import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from '../@generated/';
import {
  BadRequestException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CheckAuthGuard } from '../guards/auth-guards/check-auth.guard';
import {
  UpdateUserMutation,
  UpdateUserPasswordMutation,
} from './dto/update-user.mutation';
import { CurrentUserId } from '../guards/user.decorator';
import { OrderService } from '../order/order.service';
import * as bcrypt from 'bcrypt';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly orderService: OrderService,
  ) {}

  @UseGuards(CheckAuthGuard)
  // @Roles(Role.ADMIN) //example
  @Query(() => [User])
  users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(CheckAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('updateOneUserArgs') updateOneUserArgs: UpdateUserMutation,
    @CurrentUserId() user: any,
  ) {
    const oldUser = await this.userService.findOneByEmail({
      email: updateOneUserArgs.email,
    });
    const oldPhoneNumber =
      await this.userService.findOneByPhoneNumber(
        updateOneUserArgs.phone,
      );
    if (oldUser && oldUser.id !== user.sub) {
      throw new BadRequestException(
        `User already exist ${updateOneUserArgs.email}`,
      );
    }
    if (oldPhoneNumber && oldPhoneNumber.id !== user.sub) {
      throw new BadRequestException(
        `User already exist ${updateOneUserArgs.phone}`,
      );
    }
    return this.userService.update(user.sub, updateOneUserArgs);
  }

  @UseGuards(CheckAuthGuard)
  @Mutation(() => User)
  async updateUserPassword(
    @Args('updateUserPassword')
    updateUserPassword: UpdateUserPasswordMutation,
    @CurrentUserId() user: any,
  ) {
    const oldUser = await this.userService.findOneById({
      id: user.sub,
    });
    if (!oldUser) {
      throw new BadRequestException(`User doesn't exist`);
    }
    const isMatch = await bcrypt.compare(
      updateUserPassword.passwordOld,
      oldUser.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    const isPasswordConfirm =
      updateUserPassword.passwordConfirm ===
      updateUserPassword.passwordNew;
    if (!isPasswordConfirm) {
      throw new UnauthorizedException('Passwords dont match');
    }
    return this.userService.updatePassword(
      user.sub,
      updateUserPassword,
    );
  }

  @UseGuards(CheckAuthGuard)
  @Query(() => User)
  async whoAmI(@CurrentUserId() user: any) {
    return await this.userService.findOneById({
      id: user.sub,
    });
  }

  @ResolveField()
  async orders(@Parent() user: User) {
    return this.orderService.findAll({
      where: {
        userId: {
          equals: user.id,
        },
      },
    });
  }

  // @UseGuards(CheckAuthGuard)
  // @Query(() => User)
  // async userById(
  //   @Args('findById') findUniqueUserArgs: FindUserByIdInput,
  // ): Promise<User> {
  //   const user = await this.userService.findOneById(
  //     findUniqueUserArgs,
  //   );
  //   if (!user) {
  //     throw new NotFoundException(findUniqueUserArgs);
  //   }
  //   return user;
  // }
  //
  // @UseGuards(CheckAuthGuard)
  // @Query(() => User)
  // async userByEmail(
  //   @Args('findByEmail') findUniqueUserArgs: FindUserByEmailInput,
  // ): Promise<User> {
  //   const user = await this.userService.findOneByEmail(
  //     findUniqueUserArgs,
  //   );
  //   if (!user) {
  //     throw new NotFoundException(findUniqueUserArgs);
  //   }
  //   return user;
  // }
}

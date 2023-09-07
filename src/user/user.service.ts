import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOneUserArgs, User } from '../@generated';
import * as bcrypt from 'bcrypt';
import { FindUserByIdInput } from './dto/find-user-by-id.input';
import { FindUserByEmailInput } from './dto/find-user-by-email.input';
import {
  UpdateUserMutation,
  UpdateUserPasswordMutation,
} from './dto/update-user.mutation';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateOneUserArgs) {
    const { data } = createUserInput;
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      data.password,
      saltOrRounds,
    );
    const user = await this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
    return user;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOneById(findUniqueUserArgs: FindUserByIdInput): Promise<User> {
    return this.prisma.user.findUnique({
      where: findUniqueUserArgs,
    });
  }

  findOneByEmail(
    findUniqueUserArgs: FindUserByEmailInput,
  ): Promise<User> {
    return this.prisma.user.findUnique({
      where: findUniqueUserArgs,
    });
  }

  findOneByPhoneNumber(phoneNumber: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        phone: phoneNumber,
      },
    });
  }

  update(id: string, data: UpdateUserMutation) {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  async updatePassword(id: string, data: UpdateUserPasswordMutation) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      data.passwordNew,
      saltOrRounds,
    );
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: { password: hashedPassword },
    });
  }

  // remove(deleteOneUserArgs: string) {
  //   return this.prisma.user.delete({
  //     where: {
  //       id: deleteOneUserArgs,
  //     },
  //   });
  // }
}

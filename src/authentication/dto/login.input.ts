import { InputType, PickType } from '@nestjs/graphql';
import { UserCreateInput } from '../../@generated';

@InputType()
export class LoginInput extends PickType(UserCreateInput, [
  'email',
  'password',
]) {}

@InputType()
export class RegisterInput extends PickType(UserCreateInput, [
  'email',
  'password',
  'name',
  'phone',
]) {}

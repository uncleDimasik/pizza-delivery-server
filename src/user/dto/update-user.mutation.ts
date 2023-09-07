import { Field, InputType, PickType } from '@nestjs/graphql';
import { UserUpdateInput } from '../../@generated';
import * as Validator from 'class-validator';

@InputType()
export class UpdateUserMutation extends PickType(UserUpdateInput, [
  'name',
  'email',
  'phone',
]) {}

@InputType()
export class UpdateUserPasswordMutation {
  @Field(() => String, { nullable: false })
  @Validator.IsString()
  @Validator.MaxLength(100)
  @Validator.MinLength(8)
  passwordOld?: string;
  @Field(() => String, { nullable: false })
  @Validator.IsString()
  @Validator.MaxLength(100)
  @Validator.MinLength(8)
  passwordNew?: string;
  @Field(() => String, { nullable: false })
  @Validator.IsString()
  @Validator.MaxLength(100)
  @Validator.MinLength(8)
  passwordConfirm?: string;
}

import {
  ArgsType,
  Field,
  InputType,
  OmitType,
} from '@nestjs/graphql';
import { OrderCreateInput } from '../../@generated';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

@InputType()
class OrderInputWithoutUser extends OmitType(OrderCreateInput, [
  'user',
]) {}

@ArgsType()
export class CreateOneOrderArgsDto {
  @Field(() => OrderInputWithoutUser, { nullable: false })
  @Type(() => OrderInputWithoutUser)
  @ValidateNested({ each: true })
  data!: InstanceType<typeof OrderInputWithoutUser>;
}

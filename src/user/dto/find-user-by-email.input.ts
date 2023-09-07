import { InputType, PickType } from '@nestjs/graphql';
import { UserWhereUniqueInput } from '../../@generated';

@InputType()
export class FindUserByEmailInput extends PickType(
  UserWhereUniqueInput,
  ['email'],
) {}

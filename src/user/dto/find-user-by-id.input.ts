import { InputType, PickType } from '@nestjs/graphql';
import { UserWhereUniqueInput } from '../../@generated';

@InputType()
export class FindUserByIdInput extends PickType(
  UserWhereUniqueInput,
  ['id'],
) {}

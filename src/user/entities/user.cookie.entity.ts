import { PickType } from '@nestjs/graphql';
import { User } from '../../@generated';

export class UserCookieEntity extends PickType(User, [
  'id',
  'roles',
]) {}

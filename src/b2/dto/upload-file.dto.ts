import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UploadFileDto {
  @Field(() => ID, { nullable: false })
  id!: string;
  @Field(() => String, { nullable: false })
  name!: string;
  @Field(() => String, { nullable: false })
  url!: string;
}

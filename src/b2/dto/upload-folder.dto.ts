import { ArgsType, ObjectType } from '@nestjs/graphql';
import * as Validator from 'class-validator';

export enum EnumFolders {
  CATEGORIES = 'categories/',
  DISHES = 'dishes/',
  GOODS = 'goods/',
  INGRADIENTS = 'ingradients/',
}

@ArgsType()
export class UploadFolder {
  @Validator.IsEnum(EnumFolders)
  folderPath?: keyof typeof EnumFolders;
}

import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { B2Service } from './b2.service';
import { FileUpload } from './entities/file.entity';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { UploadFileDto } from './dto/upload-file.dto';
import { Roles } from '../guards/role.decorator';
import { Role } from '../user/entities/role.enum';
import { UseGuards } from '@nestjs/common';
import { CheckAuthGuard } from '../guards/auth-guards/check-auth.guard';
import { UploadFolder } from './dto/upload-folder.dto';

@Resolver()
export class B2Resolver {
  constructor(private readonly b2Service: B2Service) {}

  @Roles(Role.ADMIN)
  @UseGuards(CheckAuthGuard)
  @Mutation(() => UploadFileDto)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
    @Args() uploadFolder: UploadFolder,
    @Args('fileName') fileName: string,
  ) {
    return await this.b2Service.uploadFile(
      file,
      uploadFolder.folderPath,
      fileName,
    );
  }

  @Roles(Role.ADMIN)
  @UseGuards(CheckAuthGuard)
  @Mutation(() => String)
  async deleteFile(
    @Args('fileId') fileId: string,
    @Args('fileName') fileName: string,
  ) {
    return await this.b2Service.deleteFile(fileId, fileName);
  }
}

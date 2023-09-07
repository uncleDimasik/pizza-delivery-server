import { Injectable } from '@nestjs/common';
import { FileUpload } from './entities/file.entity'; // cuz "module": "commonjs"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as B2 from 'backblaze-b2'; // cuz "module": "commonjs"
import * as uploadAny from '@gideo-llc/backblaze-b2-upload-any';
import { slug } from '../utils/slug';

@Injectable()
export class B2Service {
  private b2: any;
  private bucketUrl: any;
  private readonly bucketId = process.env.B2_BUCKET_ID;
  private recommendedPartSize: string;

  constructor() {
    const applicationKeyId = process.env.B2_KEY_ID;
    const applicationKey = process.env.B2_KEY;
    const b2 = new B2({
      applicationKeyId,
      applicationKey,
    });

    b2.authorize().then((r) => {
      this.recommendedPartSize = r.data.recommendedPartSize;
      this.b2 = b2;
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    B2.prototype.uploadAny = uploadAny;
  }

  async uploadFile(
    file: FileUpload,
    folder: string,
    fileName: string,
  ): Promise<{ name: string; id: any; url: string }> {
    const newFileName = this.concatExtension(
      file.filename,
      `${folder}${fileName}`,
    );
    const res = await this.b2.uploadAny({
      bucketId: this.bucketId,
      fileName: newFileName,
      partSize: this.recommendedPartSize,
      data: file.createReadStream(),
    });
    return {
      id: res.fileId,
      name: newFileName,
      url: `${process.env.B2_ENDPOINT}${newFileName}`,
    };
  }

  private concatExtension(filename, str) {
    // Get the file extension by splitting the filename string at the last period and getting the last element of the resulting array
    const extension = filename.split('.').pop();
    // Concatenate the specified string with the file extension and return the result
    return `${str}.${extension}`;
  }

  // async downloadFile(fileId: string): Promise<Buffer> {
  //   const response = await this.b2.downloadFileById({
  //     responseType: 'document',
  //     fileId,
  //   });
  //
  //   return response.data;
  // }

  async getFiles() {
    const response = await this.b2.listFileNames({
      bucketId: this.bucketId,
    });
    // console.log(response.data.files);
    return response.data.files;
  }

  async deleteFile(fileId: string, fileName: string): Promise<void> {
    const res = await this.b2.deleteFileVersion({
      fileId,
      fileName,
    });
    return res.data.fileId;
  }
}

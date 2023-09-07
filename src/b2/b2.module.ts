import { Module } from '@nestjs/common';
import { B2Service } from './b2.service';
import { B2Resolver } from './b2.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [B2Service, B2Resolver, PrismaService],
  exports: [B2Service],
})
export class B2Module {}

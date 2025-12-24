import { Injectable } from '@nestjs/common';
import { Table } from '@prisma/client';
import { BaseRepository } from '../../common/repositories/base.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TablesRepository extends BaseRepository<Table> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'table');
  }
  

}

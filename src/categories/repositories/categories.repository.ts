import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { BaseRepository } from '../../common/repositories/base.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CategoriesRepository extends BaseRepository<Category> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'category');
  }
}

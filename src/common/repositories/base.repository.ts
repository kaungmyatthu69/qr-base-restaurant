import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginatedResponse } from '../../schemas/pagination/pagination.schema';

@Injectable()
export abstract class BaseRepository<T> {
  constructor(
    protected readonly prisma: PrismaService,
    private readonly modelName: keyof PrismaService,
  ) {}

  private get model() {
    return this.prisma[this.modelName] as any;
  }

  async transaction<T>(callback: (prisma: PrismaService) => Promise<T>) {
    return this.prisma.$transaction(callback);
  }

  async findById(id: number, args?: any): Promise<T | null> {
    return this.model.findUnique({ where: { id }, ...args });
  }

  async findAll(args?: any): Promise<T[]> {
    return this.model.findMany(args);
  }

  async findOne(args: any): Promise<T | null> {
    return this.model.findFirst(args);
  }

  async findWithPagination(
    page: number,
    limit: number,
    args?: any,
  ): Promise<PaginatedResponse<T>> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.model.findMany({
        ...args,
        skip,
        take: limit,
      }),
      this.model.count({
        where: args?.where,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  async create(data: any, args?: any): Promise<T> {
    return this.model.create({ data, ...args });
  }

  async update(id: number, data: any, args?: any): Promise<T> {
    return this.model.update({ where: { id }, data, ...args });
  }

  async delete(id: number, args?: any): Promise<T> {
    return this.model.delete({ where: { id }, ...args });
  }
}

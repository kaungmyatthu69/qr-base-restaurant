import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTableDTO } from 'src/schemas/table/create-table.schema';
import { UpdateTableDTO } from 'src/schemas/table/update-table.schema';
import { CreateCategoryDTO } from 'src/schemas/category/create-category.schema';
import { UpdateCategoryDTO } from 'src/schemas/category/update-category.schema';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return this.prisma.category.findMany();
  }

  async findById(id: number) {
    return this.prisma.category.findUnique({
      where: { id },
      include: {
        menuItems: true,
      },
    });
  }

  async findByName(name: string) {
    return this.prisma.category.findMany({
      where: {
        name: {
          startsWith: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async create(data: CreateCategoryDTO) {
    return this.prisma.category.create({
      data,
    });
  }

  async update(id: number, data: UpdateCategoryDTO) {
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}

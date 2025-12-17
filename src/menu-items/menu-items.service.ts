import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuItemDTO } from '../schemas/menu-items/create-menu-item.schema';
import { UpdateMenuItemDto } from '../schemas/menu-items/update-menu-item.schema';

@Injectable()
export class MenuItemsService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.menuItem.findMany({
      include: {
        categories: true,
      },
    });
  }

  async findByName(name: string) {
    return this.prisma.menuItem.findMany({
      where: {
        name: {
          startsWith: name,
          mode: 'insensitive',
        },
      },
    });
  }
  async findById(id: number) {
    return this.prisma.menuItem.findUnique({
      where: { id },
      include: {
        categories: true,
      },
    });
  }

  async create(data: CreateMenuItemDTO) {
    const { categories, ...rest } = data;

    if (categories && categories.length > 0) {
      const existingCategories = await this.prisma.category.findMany({
        where: { id: { in: categories } },
      });
      if (existingCategories.length !== categories.length) {
        throw new BadRequestException('One or more categories not found.');
      }
    }

    return this.prisma.menuItem.create({
      data: {
        ...rest,
        categories: {
          connect: categories?.map((id) => ({ id })),
        },
      },
    });
  }

  async update(id: number, data: UpdateMenuItemDto) {
    const { categories, ...rest } = data;


    let categoriesData;
    if (categories) {
      if (categories.length > 0) {
        const existingCategories = await this.prisma.category.findMany({
          where: { id: { in: categories } },
        });
        if (existingCategories.length !== categories.length) {
          throw new BadRequestException('One or more categories not found.');
        }
      }
      categoriesData = { set: categories.map((id) => ({ id })) };
    }

    return this.prisma.menuItem.update({
      where: { id },
      data: {
        ...rest,
        categories: categoriesData,
      },
    });
  }

  async delete(id: number) {
  
    return await this.prisma.menuItem.delete({
      where: { id },
    });
  }
}

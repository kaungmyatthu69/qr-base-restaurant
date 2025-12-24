import { BadRequestException, Injectable } from '@nestjs/common';
import { MenuItem } from '@prisma/client';
import { BaseRepository } from '../../common/repositories/base.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMenuItemDTO } from '../../schemas/menu-items/create-menu-item.schema';
import { CategoriesRepository } from '../../categories/repositories/categories.repository';
import { UpdateMenuItemDto } from '../../schemas/menu-items/update-menu-item.schema';

@Injectable()
export class MenuItemsRepository extends BaseRepository<MenuItem> {
  constructor(
    protected readonly prisma: PrismaService,
    private readonly categoriesRepository: CategoriesRepository
  ) {
    super(prisma, 'menuItem');
  }

  async create(data: CreateMenuItemDTO): Promise<MenuItem> {
    const { categories, ...rest } = data;

    if (categories && categories.length > 0) {
      const existingCategories = await this.categoriesRepository.findAll({
        where: { id: { in: categories } },
      });
      if (existingCategories.length !== categories.length) {
        throw new BadRequestException('One or more categories not found.');
      }
    }

    return super.create({
      ...rest,
      categories: {
        connect: categories?.map((id) => ({ id })),
      },
    });
  }

  async update(id: number, data: UpdateMenuItemDto): Promise<MenuItem> {
    const { categories, ...rest } = data;

    let categoriesData;
    if (categories) {
      if (categories.length > 0) {
        const existingCategories = await this.categoriesRepository.findAll({
          where: { id: { in: categories } },
        });
        if (existingCategories.length !== categories.length) {
          throw new BadRequestException('One or more categories not found.');
        }
      }
      categoriesData = { set: categories.map((id) => ({ id })) };
    }

    return super.update(id, {
      ...rest,
      categories: categoriesData,
    });
  }


}

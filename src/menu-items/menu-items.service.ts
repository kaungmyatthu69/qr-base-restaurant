import { Injectable } from '@nestjs/common';
import { CreateMenuItemDTO } from '../schemas/menu-items/create-menu-item.schema';
import { UpdateMenuItemDto } from '../schemas/menu-items/update-menu-item.schema';
import { MenuItemsRepository } from './repositories/menu-items.repository';
import { PaginatedResponse } from '../schemas/pagination/pagination.schema';
import { MenuItem } from '@prisma/client';

export interface FilterMenuItemsDTO {
  name?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  isStock?: boolean;
}

@Injectable()
export class MenuItemsService {
  constructor(private readonly menuItemsRepository: MenuItemsRepository) {}

  async findAll() {
    return this.menuItemsRepository.findAll({
      include: {
        categories: true,
      },
    });
  }

  async findAllWithPagination(
    page: number,
    limit: number,
  ): Promise<PaginatedResponse<MenuItem>> {
    return this.menuItemsRepository.findWithPagination(page, limit, {
      include: {
        categories: true,
      },
    });
  }

  async filterMenuItems(filters: FilterMenuItemsDTO) {
    const where: any = {};

    if (filters.name) {
      where.name = {
        contains: filters.name,
        mode: 'insensitive',
      };
    }

    if (filters.categoryId) {
      where.categories = {
        some: {
          id: filters.categoryId,
        },
      };
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      where.price = {};
      if (filters.minPrice !== undefined) {
        where.price.gte = filters.minPrice;
      }
      if (filters.maxPrice !== undefined) {
        where.price.lte = filters.maxPrice;
      }
    }

    if (filters.isStock !== undefined) {
      where.isStock = filters.isStock;
    }

    return this.menuItemsRepository.findAll({
      where,
      include: {
        categories: true,
      },
    });
  }

  async filterMenuItemsWithPagination(
    filters: FilterMenuItemsDTO,
    page: number,
    limit: number,
  ): Promise<PaginatedResponse<MenuItem>> {
    const where: any = {};

    if (filters.name) {
      where.name = {
        contains: filters.name,
        mode: 'insensitive',
      };
    }

    if (filters.categoryId) {
      where.categories = {
        some: {
          id: filters.categoryId,
        },
      };
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      where.price = {};
      if (filters.minPrice !== undefined) {
        where.price.gte = filters.minPrice;
      }
      if (filters.maxPrice !== undefined) {
        where.price.lte = filters.maxPrice;
      }
    }

    if (filters.isStock !== undefined) {
      where.isStock = filters.isStock;
    }

    return this.menuItemsRepository.findWithPagination(page, limit, {
      where,
      include: {
        categories: true,
      },
    });
  }

  async findById(id: number) {
    return this.menuItemsRepository.findById(id, {
      include: {
        categories: true,
      },
    });
  }

  async create(data: CreateMenuItemDTO) {
    return this.menuItemsRepository.create(data);
  }

  async update(id: number, data: UpdateMenuItemDto) {
    return this.menuItemsRepository.update(id, data);
  }

  async delete(id: number) {
    return this.menuItemsRepository.delete(id);
  }
  
}

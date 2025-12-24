import { Injectable } from '@nestjs/common';
import { CreateCategoryDTO } from '../schemas/category/create-category.schema';
import { UpdateCategoryDTO } from '../schemas/category/update-category.schema';
import { CategoriesRepository } from './repositories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}
  async findAll() {
    return this.categoriesRepository.findAll();
  }

  async findById(id: number) {
    return this.categoriesRepository.findById(id, {
      include: {
        menuItems: true,
      },
    });
  }

  async findByName(name: string) {
    return this.categoriesRepository.findAll({
      where: {
        name: {
          startsWith: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async create(data: CreateCategoryDTO) {
    return this.categoriesRepository.create(data);
  }

  async update(id: number, data: UpdateCategoryDTO) {
    return this.categoriesRepository.update(id, data);
  }

  async delete(id: number) {
    return this.categoriesRepository.delete(id);
  }

}

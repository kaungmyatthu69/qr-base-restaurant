import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import {
  CreateCategoryDTO,
  createCategorySchema,
} from 'src/schemas/category/create-category.schema';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import {
  updateCategorySchema,
  UpdateCategoryDTO,
} from 'src/schemas/category/update-category.schema';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get()
  async getAllCategories(@Query('name') name: string) {
    if (name) {
      return await this.categoriesService.findByName(name);
    }
    return await this.categoriesService.findAll();
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createCategorySchema))
  async createCategories(@Body() createCategoryDTO: CreateCategoryDTO) {
    return await this.categoriesService.create(createCategoryDTO);
  }

  @Get(':id')
  async getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriesService.findById(id);
  }

  @Patch(':id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateCategorySchema))
    updateCategoryDTO: UpdateCategoryDTO,
  ) {
    return await this.categoriesService.update(id, updateCategoryDTO);
  }

  @Delete(':id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriesService.delete(id);
  }
}

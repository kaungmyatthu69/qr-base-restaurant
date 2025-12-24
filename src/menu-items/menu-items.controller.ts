import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import {
  createMenuItemSchema,
  CreateMenuItemDTO,
} from '../schemas/menu-items/create-menu-item.schema';
import {
  UpdateMenuItemDto,
  updateMenuItemSchema,
} from '../schemas/menu-items/update-menu-item.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloundinary/cloundinary.service';
import { paginationSchema } from '../schemas/pagination/pagination.schema';

@Controller('menu-items')
export class MenuItemsController {
  constructor(
    private readonly MenuItemsService: MenuItemsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get('')
  getAllMenuItemsWithoutFilter(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    if (page || limit) {
      const { page: pageNum, limit: limitNum } = paginationSchema.parse({
        page,
        limit,
      });
      return this.MenuItemsService.findAllWithPagination(pageNum, limitNum);
    }
    return this.MenuItemsService.findAll();
  }

  @Get('search')
  getAllMenuItems(
    @Query('name') name?: string,
    @Query('categoryId') categoryId?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('isStock') isStock?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const filters = {
      name,
      categoryId: categoryId ? parseInt(categoryId) : undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      isStock: isStock ? isStock === 'true' : undefined,
    };

    if (page || limit) {
      const { page: pageNum, limit: limitNum } = paginationSchema.parse({
        page,
        limit,
      });
      return this.MenuItemsService.filterMenuItemsWithPagination(
        filters,
        pageNum,
        limitNum,
      );
    }

    return this.MenuItemsService.filterMenuItems(filters);
  }

  @Post()
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file'))
  async createMenuItem(
    @UploadedFile() file: Express.Multer.File,
    @Body(new ZodValidationPipe(createMenuItemSchema))
    createMenuItemDto: CreateMenuItemDTO,
  ) {
    const result = await this.cloudinaryService.uploadImage(file);
    createMenuItemDto = {
      ...createMenuItemDto,
      imageUrl: result?.secure_url,
      imagePublicId: result?.public_id,
    };
    console.log('result', result);

    return await this.MenuItemsService.create(createMenuItemDto);
  }

  @Get(':id')
  async getMenuItemById(@Param('id', ParseIntPipe) id: number) {
    return await this.MenuItemsService.findById(id);
  }
  @Patch(':id')
  async updateMenuItem(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateMenuItemSchema))
    updateMenuItemDto: UpdateMenuItemDto,
  ) {
    return await this.MenuItemsService.update(id, updateMenuItemDto);
  }

  @Delete(':id')
  async deleteMenuItem(@Param('id', ParseIntPipe) id: number) {
    return await this.MenuItemsService.delete(id);
  }
}

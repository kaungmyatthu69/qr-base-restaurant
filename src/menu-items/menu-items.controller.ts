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
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import {
  createMenuItemSchema,
  CreateMenuItemDTO,
} from 'src/schemas/menu-items/create-menu-item.schema';
import {
  UpdateMenuItemDto,
  updateMenuItemSchema,
} from 'src/schemas/menu-items/update-menu-item.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloundinary/cloundinary.service';
@Controller('menu-items')
export class MenuItemsController {
  constructor(
    private readonly MenuItemsService: MenuItemsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  @Get()
  getAllMenuItems(@Query('name') name?: string) {
    if (name) {
      return this.MenuItemsService.findByName(name);
    }
    return this.MenuItemsService.findAll();
  }

  @Post()
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
  @UseInterceptors(FileInterceptor('file'))
  async updateMenuItem(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body(new ZodValidationPipe(updateMenuItemSchema))
    updateMenuItemDto: UpdateMenuItemDto,
  ) {
    let oldItem = await this.MenuItemsService.findById(id);
    // 1. Upload new image
    const newImage = await this.cloudinaryService.uploadImage(file);

    if (oldItem && oldItem.imagePublicId) {
      await this.cloudinaryService.deleteImage(oldItem.imagePublicId);
    }
    updateMenuItemDto = {
      ...updateMenuItemDto,
      imageUrl: newImage?.secure_url,
      imagePublicId: newImage?.public_id,
    };
    return await this.MenuItemsService.update(id, updateMenuItemDto);
  }

  @Delete(':id')
  async deleteMenuItem(@Param('id', ParseIntPipe) id: number) {
    let item = await this.MenuItemsService.findById(id);
    if (item && item.imagePublicId) {
      await this.cloudinaryService.deleteImage(item.imagePublicId);
    }
    return await this.MenuItemsService.delete(id);
  }
}

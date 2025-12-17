import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { TablesService } from './tables.service';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

import {
  createTableSchema,
  type CreateTableDTO,
} from '../schemas/table/create-table.schema';
import {
  updateTableSchema,
  UpdateTableDTO,
} from '../schemas/table/update-table.schema';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}
  @Get()
  findAll() {
    return this.tablesService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.tablesService.findById(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createTableSchema))
  createTable(@Body() createTableDTO: CreateTableDTO) {
    return this.tablesService.create(createTableDTO);
  }

  @Patch(':id')
  updateTable(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateTableSchema))
    updateTableDTO: UpdateTableDTO,
  ) {
    return this.tablesService.update(id, updateTableDTO);
  }

  @Delete(':id')
  deleteTable(@Param('id', ParseIntPipe) id: number) {
    return this.tablesService.delete(id);
  }
}

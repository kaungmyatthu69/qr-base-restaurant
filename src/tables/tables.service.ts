import { Injectable } from '@nestjs/common';
import { CreateTableDTO } from '../schemas/table/create-table.schema';
import { UpdateTableDTO } from '../schemas/table/update-table.schema';
import { TablesRepository } from './repositories/tables.repository';

@Injectable()
export class TablesService {
  constructor(private readonly tablesRepository: TablesRepository) {}

  async findAll() {
    return this.tablesRepository.findAll();
  }

  async findById(id: number) {
    return this.tablesRepository.findById(id);
  }

  async create(data: CreateTableDTO) {
    return this.tablesRepository.create(data);
  }

  async update(id: number, data: UpdateTableDTO) {
    return this.tablesRepository.update(id, data);
  }

  async delete(id: number) {
    return this.tablesRepository.delete(id);
  }
}

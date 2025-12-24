import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TablesController } from './tables.controller';
import { TablesService } from './tables.service';
import { LoggerMiddleware } from '../middlewares/logger.middleware';
import { TablesRepository } from './repositories/tables.repository';

@Module({
  imports: [],
  controllers: [TablesController],
  providers: [TablesService, TablesRepository],
})
export class TablesModule {}

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TablesController } from './tables.controller';
import { TablesService } from './tables.service';
import { LoggerMiddleware } from '../middlewares/logger.middleware';

@Module({
  imports: [],
  controllers: [TablesController],
  providers: [TablesService],
})
export class TablesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('tables');
  }
}

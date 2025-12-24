import { Module } from '@nestjs/common';
import { MenuItemsController } from './menu-items.controller';
import { MenuItemsService } from './menu-items.service';
import { CloundinaryModule } from '../cloundinary/cloundinary.module';
import { MenuItemsRepository } from './repositories/menu-items.repository';
import { CategoriesRepository } from '../categories/repositories/categories.repository';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [CloundinaryModule, CategoriesModule],
  controllers: [MenuItemsController],
  providers: [MenuItemsService, MenuItemsRepository],
})
export class MenuItemsModule {}

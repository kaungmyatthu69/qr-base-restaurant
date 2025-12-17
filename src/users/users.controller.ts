import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Serialize } from 'src/common/decorators/serialize.decorator';
import { UserResponseDto } from './dto/user.response.dto';

@Controller('users')
@UseGuards(RolesGuard)
@Roles(UserRole.Manager) 
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Serialize(UserResponseDto)
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}

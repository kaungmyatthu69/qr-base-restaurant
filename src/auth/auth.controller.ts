import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  UsePipes,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {
  CreateUserDTO,
  createUserSchema,
} from '../schemas/user/create-user.schema';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { UsersService } from '../users/users.service';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  // This guard uses the 'local' strategy we defined
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(200)
  @Public()
  async login(@Request() req) {
    // If the guard succeeds, req.user is populated by LocalStrategy.validate()
    return this.authService.login(req.user);
  }

  @Post('sing-up')
  @Public()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async singup(@Body() createUserDto: CreateUserDTO) {
    await this.usersService.create(createUserDto);
    // 2. Automatically log the user in by generating a JWT
    // return this.authService.login(user);
    return {
      message: 'Registration successful',
    };
  }
}

// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  // 1. Called by LocalStrategy to verify user credentials
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    // Check if user exists and password is correct
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user; // Destructure to remove password
      return result;
    }
    return null;
  }

  // 2. Called by AuthController upon successful login
  async login(user: any) {
    const payload = { name: user.name, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

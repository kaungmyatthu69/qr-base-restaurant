import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // Configure the strategy to look for 'username' and 'password'
    super({
      usernameField:'email',
      passwordField:'password'
    });
  }

  // The 'validate' method is called by the Passport Guard
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    console.log('user',user)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // IMPORTANT: Passport expects the method to return the user object (without the password)
    return user;
  }
}

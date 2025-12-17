// src/auth/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract from 'Authorization: Bearer ...' header
      ignoreExpiration: false,
      secretOrKey: process.env.SECERT as string, // Must match the secret in AuthModule
    });
  }

  // The payload is the decoded JWT
  async validate(payload: any) {
    // This is where you can check if the user is still active in the database
    // For now, we just return the user data from the token
    return { userId: payload.sub, username: payload.name ,role:payload.role };
  }
}

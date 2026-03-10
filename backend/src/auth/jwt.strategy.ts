import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { // NestJS will use this class whenever JWT authentication is required.

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract the token from the HTTP Authorization header.
      ignoreExpiration: false, // If the token expired, reject it.
      secretOrKey: 'supersecret', // This is the secret used to verify the JWT signature. It must match the secret used when creating the token.
    });
  }

  async validate(payload: any) { // This function runs after the token is verified. The payload is the data stored inside the JWT.
    return {
      userId: payload.userId,
      email: payload.email,
    };
  }

}
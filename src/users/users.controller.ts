import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('users') // Base route /users
export class UsersController {

  @UseGuards(JwtAuthGuard) // This decorator protects route using JWT guard.
  @Get('me') // GET /users/me
  getProfile(@Request() req) { // @Request() injects the HTTP request object.
    return req.user;
  }

}
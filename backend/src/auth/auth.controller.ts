import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth') // This sets the base route: /auth
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('register') // POST /auth/register
  register(@Body() body: RegisterDto) { // NestJS automatically converts the request body into a RegisterDto object.
    return this.authService.register(
      body.email,
      body.password,
    );
  }

  @Post('login') // POST /auth/login
  login(@Body() body: LoginDto) {
    return this.authService.login(
      body.email,
      body.password,
    );
  }

}

import { Injectable, UnauthorizedException } from '@nestjs/common'; // UnauthorizedException: This is a built-in HTTP error.
import { UsersService } from '../users/users.service'; // Used to interact with the users database table.
import { JwtService } from '@nestjs/jwt'; // Used to generate JWT tokens.
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // This creates a new user account.
  async register(email: string, password: string) {

    const hashedPassword = await bcrypt.hash(password, 10); // Hashes the original password.

    // Create a new user.
    const user = await this.usersService.createUser(
      email,
      hashedPassword,
    );

    // Generate JWT token.
    const token = this.jwtService.sign({
      userId: user.id,
      email: user.email,
    });

    // Return token.
    return {
      access_token: token,
    };
  }

  // This authenticates a user.
  async login(email: string, password: string) {

    const user = await this.usersService.findByEmail(email); // Checks if the user is already present.

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(password, user.password); // Checks if the password is correct.

    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      userId: user.id,
      email: user.email,
    });

    return {
      access_token: token,
    };
  }

}
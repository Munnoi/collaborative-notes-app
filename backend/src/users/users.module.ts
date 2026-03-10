import { Module } from '@nestjs/common';
import { UsersService } from './users.service'; // Service: reponsible for business logic, db operations.
import { UsersController } from './users.controller'; // Controller: handle HTTP requests, call services.
import { TypeOrmModule } from '@nestjs/typeorm'; // This allows nestjs to interact with db using entities.
import { User } from './user.entity'; // Entity: representing db table.

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Registers user entity repo inside this module.
  providers: [UsersService], // Providers are classes NestJS can inject using Dependency Injection.
  controllers: [UsersController], // Registers the controller that handles the http requests.
  exports: [UsersService], // This allows other modules to use UsersService.
}) // Marks this class as a module.
export class UsersModule {}

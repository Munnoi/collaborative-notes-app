import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // This decorator allows NestJS to inject a TypeORM repository into the service.
import { Repository } from 'typeorm'; // Repository<T> is a class used to interact with the database table for an entity.
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable() // This class can be injected into controllers or other services.
export class UsersService {
    constructor(
        @InjectRepository(User) // This injects the User repository.
        private userRepository: Repository<User>,
    ) {}

    async createUser(email: string, password: string) {
        const user = this.userRepository.create({ email, password }); // This creates an entity instance.
        await this.userRepository.save(user); // Save to db.
        return user;
    }

    async findByEmail(email: string) {
        // SELECT * FROM users
        // WHERE email = 'example@email.com'
        // LIMIT 1
        return this.userRepository.findOne({ where: { email } });
    }
}

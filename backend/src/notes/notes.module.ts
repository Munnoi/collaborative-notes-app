import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { JwtModule } from '@nestjs/jwt';
import { NotesGateway } from './notes.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Note]),
    JwtModule.register({ secret: 'supersecret' }),
  ],
  providers: [NotesService, NotesGateway],
  controllers: [NotesController]
})
export class NotesModule {}

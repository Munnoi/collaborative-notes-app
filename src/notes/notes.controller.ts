import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
    constructor(private notesService: NotesService) {}

    @Post()
    createNote(@Body() body, @Request() req) {
        return this.notesService.createNote(
            body.title,
            body.content,
            req.user.userId,
        );
    }

    @Get()
    getUserNotes(@Request() req) {
        return this.notesService.getUserNotes(req.user.userId);
    }

    @Get(':id')
    getNote(@Param('id') id: string) {
        return this.notesService.getNoteById(Number(id));
    }

    @Patch(':id')
    updateNote(
        @Param('id') id: string,
        @Body() body,
    ) {
        return this.notesService.updateNote(
            Number(id),
            body.title,
            body.content,
        );
    }

    @Delete(':id')
    deleteNote(@Param('id') id: string) {
        return this.notesService.deleteNote(Number(id));
    }
}
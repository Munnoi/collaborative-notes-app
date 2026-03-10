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
  NotFoundException,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('notes')
export class NotesController {
    constructor(private notesService: NotesService) {}

    @Get('public/:id')
    async getPublicNote(@Param('id') id: string) {
        const note = await this.notesService.getPublicNote(Number(id));
        if (!note) {
            throw new NotFoundException('Note not found');
        }
        return note;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    createNote(@Body() body, @Request() req) {
        return this.notesService.createNote(
            body.title,
            body.content,
            req.user.userId,
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getUserNotes(@Request() req) {
        return this.notesService.getUserNotes(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getNote(@Param('id') id: string) {
        return this.notesService.getNoteById(Number(id));
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updateNote(
        @Param('id') id: string,
        @Body() body,
    ) {
        return this.notesService.updateNote(
            Number(id),
            body.title,
            body.content,
            body.isPublic,
        );
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteNote(@Param('id') id: string) {
        return this.notesService.deleteNote(Number(id));
    }
}
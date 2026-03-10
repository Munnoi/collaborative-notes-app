import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  async createNote(title: string, content: string, ownerId: number) {
    const note = this.notesRepository.create({
      title,
      content,
      owner: { id: ownerId },
    });

    return this.notesRepository.save(note);
  }

  async getUserNotes(userId: number) {
    return this.notesRepository.find({
      where: {
        owner: { id: userId },
      },
    });
  }

  async getNoteById(noteId: number) {
    return this.notesRepository.findOne({
      where: { id: noteId },
    });
  }

  async updateNote(noteId: number, title: string, content: string, isPublic?: boolean) {
    const updateData: Partial<{ title: string; content: string; isPublic: boolean }> = {
      title,
      content,
    };
    if (isPublic !== undefined) {
      updateData.isPublic = isPublic;
    }
    await this.notesRepository.update(noteId, updateData);

    return this.getNoteById(noteId);
  }

  async getPublicNote(noteId: number) {
    return this.notesRepository.findOne({
      where: { id: noteId, isPublic: true },
    });
  }

  async deleteNote(noteId: number) {
    return this.notesRepository.delete(noteId);
  }
}
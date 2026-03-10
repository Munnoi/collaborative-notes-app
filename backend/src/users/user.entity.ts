import { Controller } from '@nestjs/common';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { OneToMany } from 'typeorm';
import { Note } from '../notes/note.entity';



@Entity() // Marks this class as a db table.
export class User {
    @OneToMany(() => Note, (note) => note.owner) // User (1)  ----  (many) Notes
    notes: Note[];

    @PrimaryGeneratedColumn() // Auto-increment ID.
    id: number;

    @Column({ unique: true }) // A unique column. 
    email: string;

    @Column() // Regular column.
    password: string;

    @CreateDateColumn() // Auto timestamp.
    created_at: Date;
}
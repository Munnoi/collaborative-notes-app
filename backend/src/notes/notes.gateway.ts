import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { NotesService } from './notes.service';

@WebSocketGateway({ cors: { origin: '*' } }) // Creates a websocket server.
export class NotesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() // This gives access to the Socket.IO server instance.
  server: Server;

  constructor(
    private jwtService: JwtService,
    private notesService: NotesService,
  ) {}

  handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token; // The client sends the token during connection.
      this.jwtService.verify(token);
    } catch {
      client.disconnect(); // If token is invalid.
    }
  }

  handleDisconnect() {} // Runs when client disconnects.

  @SubscribeMessage('joinNote')
  handleJoinNote(
    @ConnectedSocket() client: Socket,
    @MessageBody() noteId: number,
  ) {
    client.join(`note-${noteId}`);
  }

  @SubscribeMessage('leaveNote')
  handleLeaveNote(
    @ConnectedSocket() client: Socket,
    @MessageBody() noteId: number,
  ) {
    client.leave(`note-${noteId}`);
  }

  @SubscribeMessage('editNote')
  async handleEditNote(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { noteId: number; title: string; content: string },
  ) {
    await this.notesService.updateNote(data.noteId, data.title, data.content);
    client.to(`note-${data.noteId}`).emit('noteUpdated', {
      noteId: data.noteId,
      title: data.title,
      content: data.content,
    });
  }
}

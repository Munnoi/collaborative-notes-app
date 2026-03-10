import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

interface NoteData {
  title: string;
  content: string;
}

export function useNoteSocket(noteId: string | undefined) {
  const [remoteNote, setRemoteNote] = useState<NoteData | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!noteId) return;

    const token = localStorage.getItem('token');
    const socket = io('http://localhost:3000', {
      auth: { token },
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('joinNote', Number(noteId));
    });

    socket.on('noteUpdated', (data: NoteData) => {
      setRemoteNote({ title: data.title, content: data.content });
    });

    return () => {
      socket.emit('leaveNote', Number(noteId));
      socket.disconnect();
      socketRef.current = null;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [noteId]);

  const sendEdit = useCallback(
    (data: { title: string; content: string }) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        socketRef.current?.emit('editNote', {
          noteId: Number(noteId),
          title: data.title,
          content: data.content,
        });
      }, 300);
    },
    [noteId],
  );

  return { remoteNote, sendEdit };
}

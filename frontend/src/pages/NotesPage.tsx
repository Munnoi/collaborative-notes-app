import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';

interface Note {
  id: number;
  title: string;
  content: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showForm, setShowForm] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchNotes = async () => {
    const { data } = await api.get('/notes');
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreate = async (body: { title: string; content: string }) => {
    await api.post('/notes', body);
    setShowForm(false);
    fetchNotes();
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/notes/${id}`);
    setNotes((prev) => prev.filter((n) => n.id !== id)); // Removing the deleted note from the UI.
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">My Notes</h1>
        <div className="flex gap-3">
          <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 text-sm">
            {showForm ? 'Cancel' : 'New Note'}
          </button>
          <button onClick={() => { logout(); navigate('/login'); }} className="text-gray-600 hover:text-gray-900 text-sm">
            Logout
          </button>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-6">
        {showForm && (
          <div className="mb-6">
            <NoteForm onSubmit={handleCreate} submitLabel="Create Note" />
          </div>
        )}
        {notes.length === 0 ? (
          <p className="text-gray-500 text-center mt-12">No notes yet. Create one!</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <NoteCard key={note.id} {...note} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

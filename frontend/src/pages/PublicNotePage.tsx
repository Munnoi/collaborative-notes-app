import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function PublicNotePage() {
  const { id } = useParams();
  const [note, setNote] = useState<{ title: string; content: string } | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`/notes/public/${id}`)
      .then((res) => setNote(res.data))
      .catch(() => setError(true));
  }, [id]);

  if (error) return <p className="p-6 text-center text-gray-500">Note not found.</p>;
  if (!note) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm px-6 py-4">
        <h1 className="text-xl font-bold">{note.title}</h1>
      </header>
      <main className="max-w-2xl mx-auto p-6">
        <p className="whitespace-pre-wrap">{note.content}</p>
      </main>
    </div>
  );
}

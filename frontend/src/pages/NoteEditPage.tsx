import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import NoteForm from '../components/NoteForm';
import { useNoteSocket } from '../hooks/useNoteSocket';

export default function NoteEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { remoteNote, sendEdit } = useNoteSocket(id);

  useEffect(() => {
    api.get(`/notes/${id}`).then((res) => {
      setTitle(res.data.title);
      setContent(res.data.content);
      setIsPublic(res.data.isPublic ?? false);
      setLoaded(true);
    });
  }, [id]);

  useEffect(() => {
    if (remoteNote) {
      setTitle(remoteNote.title);
      setContent(remoteNote.content);
    }
  }, [remoteNote]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    sendEdit({ title: val, content });
  };

  const handleContentChange = (val: string) => {
    setContent(val);
    sendEdit({ title, content: val });
  };

  const handleSave = async (data: { title: string; content: string }) => {
    await api.patch(`/notes/${id}`, { ...data, isPublic });
    navigate('/notes');
  };

  if (!loaded) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Edit Note</h1>
        <button onClick={() => navigate('/notes')} className="text-gray-600 hover:text-gray-900 text-sm">
          Back
        </button>
      </header>
      <main className="max-w-2xl mx-auto p-6">
        <div className="mb-4 flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="rounded border-gray-300"
            />
            Public
          </label>
          {isPublic && (
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(`${window.location.origin}/public/${id}`)}
              className="text-xs text-blue-600 hover:text-blue-800 underline"
            >
              Copy public link
            </button>
          )}
        </div>
        <NoteForm
          title={title}
          content={content}
          onTitleChange={handleTitleChange}
          onContentChange={handleContentChange}
          onSubmit={handleSave}
          submitLabel="Save Changes"
        />
      </main>
    </div>
  );
}

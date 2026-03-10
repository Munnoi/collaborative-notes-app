import { useState, type FormEvent } from 'react';

interface Props {
  initial?: { title: string; content: string };
  title?: string;
  content?: string;
  onTitleChange?: (title: string) => void;
  onContentChange?: (content: string) => void;
  onSubmit: (data: { title: string; content: string }) => Promise<void>;
  submitLabel: string;
}

export default function NoteForm({
  initial,
  title: controlledTitle,
  content: controlledContent,
  onTitleChange,
  onContentChange,
  onSubmit,
  submitLabel,
}: Props) {
  const [internalTitle, setInternalTitle] = useState(initial?.title ?? '');
  const [internalContent, setInternalContent] = useState(initial?.content ?? '');
  const [loading, setLoading] = useState(false);

  const isControlled = controlledTitle !== undefined;
  const title = isControlled ? controlledTitle : internalTitle;
  const content = isControlled ? controlledContent! : internalContent;

  const handleTitleChange = (val: string) => {
    if (isControlled) {
      onTitleChange?.(val);
    } else {
      setInternalTitle(val);
    }
  };

  const handleContentChange = (val: string) => {
    if (isControlled) {
      onContentChange?.(val);
    } else {
      setInternalContent(val);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ title, content });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => handleTitleChange(e.target.value)}
        required
        className="w-full border rounded px-3 py-2"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => handleContentChange(e.target.value)}
        rows={8}
        required
        className="w-full border rounded px-3 py-2"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}

import { Link } from 'react-router-dom';

interface Props {
  id: number;
  title: string;
  content: string;
  onDelete: (id: number) => void;
}

export default function NoteCard({ id, title, content, onDelete }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-lg truncate">{title}</h3>
      <p className="text-gray-600 mt-1 line-clamp-3">{content}</p>
      <div className="mt-3 flex gap-2">
        <Link to={`/notes/${id}/edit`} className="text-blue-600 hover:underline text-sm">
          Edit
        </Link>
        <button onClick={() => onDelete(id)} className="text-red-600 hover:underline text-sm">
          Delete
        </button>
      </div>
    </div>
  );
}

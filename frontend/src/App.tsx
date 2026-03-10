import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotesPage from './pages/NotesPage';
import NoteEditPage from './pages/NoteEditPage';
import PublicNotePage from './pages/PublicNotePage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/public/:id" element={<PublicNotePage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/notes/:id/edit" element={<NoteEditPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/notes" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

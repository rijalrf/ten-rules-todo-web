
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/common/MainLayout';
import ListPage from './pages/ListPage';
import AddTodoPage from './pages/AddTodoPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  // Lihat Mas, hooks useTodos-nya ILANG dari sini!
  return (
    <MainLayout>
      <Routes>
        {/* Halaman yang DIKUNCI */}
        <Route path="/" element={
          <ProtectedRoute>
            <ListPage />
          </ProtectedRoute>
        } />

        <Route path="/add" element={
          <ProtectedRoute>
            <AddTodoPage />
          </ProtectedRoute>
        } />

        {/* Halaman yang BEBAS diakses */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
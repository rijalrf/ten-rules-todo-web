import { Routes, Route } from 'react-router-dom';
import MainLayout from '@src/templates/MainLayout';
import ListPage from '@src/pages/ListPage';
import AddTodoPage from '@src/pages/AddTodoPage';
import AboutPage from '@src/pages/AboutPage';
import LoginPage from '@src/pages/LoginPage';
import RegisterPage from '@src/pages/RegisterPage';
import ProtectedRoute from '@src/routes/ProtectedRoute';

function App() {
  return (
    <MainLayout>
      <Routes>
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;

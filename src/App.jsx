
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/common/MainLayout';
import ListPage from './pages/ListPage';
import AddTodoPage from './pages/AddTodoPage';
import AboutPage from './pages/AboutPage';

function App() {
  // Lihat Mas, hooks useTodos-nya ILANG dari sini!
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/add" element={<AddTodoPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
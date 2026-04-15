import { useTodos } from '../hooks/useTodos';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import TodoItem from '../components/TodoItem';

const ListPage = () => {
    const { todos, loading, handleToggle, handleDelete } = useTodos(); // Panggil di sini!
    const navigate = useNavigate();

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Daftar Tugas</h3>
                <button className="btn btn-primary btn-sm" onClick={() => navigate('/add')}>+ Tambah</button>
            </div>
            {loading ? <LoadingSpinner /> : (
                <ul className="list-group shadow-sm">
                    {todos.map(todo => (
                        <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} onDelete={handleDelete} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListPage;
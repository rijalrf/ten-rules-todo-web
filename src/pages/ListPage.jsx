import { useTodos } from '../hooks/useTodos';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import TodoItem from '../components/TodoItem';
import Button from '../components/ui/Button';

const ListPage = () => {
    const { todos, loading, error, handleToggle, handleDelete } = useTodos();
    const navigate = useNavigate();

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Daftar Tugas</h3>
                <Button variant="primary" size="sm" onClick={() => navigate('/add')}>
                    + Tambah
                </Button>
            </div>
...
            {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                </div>
            )}

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
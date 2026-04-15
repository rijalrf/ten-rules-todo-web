import { formatDate } from "../utils/formatDate";

const TodoItem = ({ todo, onToggle, onDelete }) => {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div
                style={{ cursor: 'pointer', textDecoration: todo.is_completed ? 'line-through' : 'none' }}
                onClick={() => onToggle(todo)}
            >
                {todo.title}

            
                <p className="text-muted">{todo.description}</p>
            
            <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                Dibuat: {formatDate(todo.created_at)}
            </small>
            </div>
            <div>
                <button
                    className={`btn btn-sm me-2 ${todo.is_completed ? 'btn-warning' : 'btn-success'}`}
                    onClick={() => onToggle(todo)}
                >
                    {todo.is_completed ? 'Undo' : 'Selesai'}
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => onDelete(todo.id)}>
                    Hapus
                </button>
            </div>
        </li>
    );
};

export default TodoItem;
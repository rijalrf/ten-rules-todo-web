import { formatDate } from "../utils/formatDate";
import Button from "./ui/Button";

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
                <Button
                    variant={todo.is_completed ? "warning" : "success"}
                    size="sm"
                    className="me-2"
                    onClick={() => onToggle(todo)}
                >
                    {todo.is_completed ? 'Undo' : 'Selesai'}
                </Button>
                <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => onDelete(todo.id)}
                >
                    Hapus
                </Button>
            </div>
        </li>
    );
};

export default TodoItem;
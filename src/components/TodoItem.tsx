import { formatDate } from "@src/utils/formatDate";
import { Todo } from "@src/types/todo";
import Button from "./ui/Button";

interface TodoItemProps {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
    return (
        <li className="group bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all duration-300 flex items-start space-x-4">
            <div 
              className={`mt-1.5 w-6 h-6 rounded-full border-2 cursor-pointer flex items-center justify-center transition-colors ${
                todo.is_completed ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300 hover:border-indigo-400'
              }`}
              onClick={() => onToggle(todo)}
            >
              {todo.is_completed && <span className="text-white text-xs">✓</span>}
            </div>

            <div className="flex-1 min-w-0">
                <h4 
                  className={`text-base font-bold truncate transition-all duration-300 ${
                    todo.is_completed ? 'line-through text-slate-400' : 'text-slate-800'
                  }`}
                  onClick={() => onToggle(todo)}
                  style={{ cursor: 'pointer' }}
                >
                    {todo.title}
                </h4>
                {todo.description && (
                  <p className={`mt-1 text-sm line-clamp-2 ${todo.is_completed ? 'text-slate-300' : 'text-slate-500'}`}>
                    {todo.description}
                  </p>
                )}
                <div className="mt-3 flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                      {formatDate(todo.created_at)}
                  </span>
                </div>
            </div>

            <div className="flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button 
                    variant="danger" 
                    size="sm" 
                    className="!p-1.5 h-8 w-8 !rounded-lg"
                    onClick={() => onDelete(todo.id)}
                >
                    🗑️
                </Button>
            </div>
        </li>
    );
};

export default TodoItem;

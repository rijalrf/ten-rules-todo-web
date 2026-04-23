import { useNavigate } from 'react-router-dom';
import TodoForm from '@src/components/TodoForm';
import { useTodos } from '@src/hooks/useTodos';
import { TodoInput } from '@src/types/todo';

const AddTodoPage = () => {
    const navigate = useNavigate();
    const { handleAdd } = useTodos();

    const onAddSubmit = async (todo: TodoInput) => {
        try {
            await handleAdd(todo);
            navigate('/');
        } catch (error) {
            console.error("Gagal nambah:", error);
        }
    };

    return (
        <div className="max-w-xl mx-auto">
            <button 
              className="group text-slate-400 hover:text-indigo-600 font-bold mb-8 flex items-center transition-colors" 
              onClick={() => navigate(-1)}
            >
                <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span> 
                Kembali
            </button>
            <div className="mb-10">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Tugas Baru</h2>
                <p className="text-slate-500 font-medium">Tambahkan detail tugas yang akan Anda selesaikan.</p>
            </div>
            <TodoForm onAdd={onAddSubmit} />
        </div>
    );
};

export default AddTodoPage;

import { useTodos } from '@src/hooks/useTodos';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '@src/components/ui/LoadingSpinner';
import TodoItem from '@src/components/TodoItem';
import Button from '@src/components/ui/Button';

const ListPage = () => {
    const { todos, loading, error, handleToggle, handleDelete } = useTodos();
    const navigate = useNavigate();

    return (
        <div className="max-w-2xl mx-auto">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-1">Daftar Tugas</h1>
                    <p className="text-slate-500 font-medium">Kelola produktivitas harian Anda.</p>
                </div>
                <Button variant="primary" onClick={() => navigate('/add')} className="w-full md:w-auto">
                    <span className="mr-2 text-lg">+</span> Tugas Baru
                </Button>
            </header>

            {error && (
                <div className="bg-rose-50 border border-rose-100 text-rose-600 px-5 py-4 rounded-2xl mb-8 flex items-center shadow-sm animate-in fade-in zoom-in duration-300">
                    <span className="mr-3 text-lg font-bold">!</span>
                    <p className="text-sm font-semibold">{error}</p>
                </div>
            )}

            {loading ? <LoadingSpinner /> : (
                <div className="space-y-4">
                    {todos.length > 0 ? (
                        <ul className="grid grid-cols-1 gap-4">
                            {todos.map(todo => (
                                <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} onDelete={handleDelete} />
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl text-slate-300 text-slate-400">📝</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-1">Belum ada tugas</h3>
                            <p className="text-slate-500 mb-6 max-w-xs mx-auto">Mulai hari Anda dengan menambahkan tugas pertama.</p>
                            <Button variant="secondary" size="sm" onClick={() => navigate('/add')}>
                                Tambah Sekarang
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ListPage;

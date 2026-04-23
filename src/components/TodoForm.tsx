import { useState, FormEvent } from 'react';
import { TodoInput } from '@src/types/todo';
import Button from './ui/Button';
import { validateTodoTitle } from '@src/validators/todoValidator';

interface TodoFormProps {
  onAdd: (todo: TodoInput) => void;
}

const TodoForm = ({ onAdd }: TodoFormProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        // Jalankan validasi
        const validationError = validateTodoTitle(title);
        if (validationError) {
            setError(validationError);
            return;
        }

        // Jika valid, hapus error dan kirim data
        setError(null);
        onAdd({ title, description });
        
        // Reset form
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            {error && (
                <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl mb-6 text-sm font-semibold animate-in fade-in zoom-in duration-300">
                    {error}
                </div>
            )}
            
            <div className="mb-6">
                <label className="block text-slate-700 text-sm font-bold mb-2 ml-1">Nama Tugas</label>
                <input
                    type="text"
                    className={`w-full px-5 py-4 bg-slate-50 border ${error ? 'border-rose-300 focus:ring-rose-500' : 'border-slate-200 focus:ring-indigo-500'} rounded-2xl focus:outline-none focus:ring-2 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400`}
                    placeholder="Apa yang ingin Anda kerjakan?"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        if (error) setError(null); // Hapus error saat user mulai mengetik
                    }}
                />
            </div>
            <div className="mb-8">
                <label className="block text-slate-700 text-sm font-bold mb-2 ml-1">Detail Tambahan</label>
                <textarea
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
                    placeholder="Berikan deskripsi singkat (opsional)"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <Button type="submit" className="w-full py-4 text-base uppercase tracking-widest">
                Simpan Tugas
            </Button>
        </form>
    );
};

export default TodoForm;

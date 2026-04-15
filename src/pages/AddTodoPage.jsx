import { useNavigate } from 'react-router-dom'; // 1. Import hook navigasi
import TodoForm from '../components/TodoForm';
import { useTodos } from '../hooks/useTodos'; // 2. Pakai hook logic di sini

const AddTodoPage = () => {
    const navigate = useNavigate(); // 3. Inisialisasi navigasi
    const { handleAdd } = useTodos(); // 4. Ambil fungsi tambah data

    const onAddSubmit = async (title) => {
        try {
            await handleAdd(title);
            navigate('/'); // 5. Setelah sukses, pindah ke halaman list (Back otomatis)
        } catch (error) {
            console.error("Gagal nambah:", error);
        }
    };

    return (
        <div>
            {/* 6. Gunakan navigate(-1) untuk balik ke halaman sebelumnya */}
            <button className="btn btn-link mb-3 p-0" onClick={() => navigate(-1)}>
                &larr; Kembali ke List
            </button>
            <h3 className="mb-4">Tambah Tugas Baru</h3>
            <TodoForm onAdd={onAddSubmit} />
        </div>
    );
};

export default AddTodoPage;
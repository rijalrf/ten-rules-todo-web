import { useState } from 'react';

const TodoForm = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [is_completed, setIsCompleted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return; // Cek jangan cuma spasi doang

        onAdd({ title, description, is_completed }); // Lempar data ke parent (App.jsx)
        setTitle(''); // Reset input
        setDescription(''); // Reset input
        setIsCompleted(false); // Reset checkbox
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="input-group shadow-sm">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Ada tugas apa lagi, Mas?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="input-group mt-2 shadow-sm">
                <textarea
                    className="form-control"
                    placeholder="Deskripsi (opsional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="d-grid mt-3">
                <button className="btn btn-primary px-4" type="submit">Tambah</button>
            </div>
        </form>
    );
};

export default TodoForm;
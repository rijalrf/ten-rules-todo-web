import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '@src/services/authService';
import Button from '@src/components/ui/Button';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errors, setErrors] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        setErrors(null);
        setLoading(true);

        try {
            await register({ name, email, password, password_confirmation: passwordConfirm });
            navigate('/login');
        } catch (err: any) {
            setErrors(err.response?.data?.errors || { message: "Gagal registrasi. Pastikan data benar." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mt-6 px-4">
            <div className="w-full max-w-[450px]">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Buat Akun</h2>
                    <p className="text-slate-500 font-medium text-lg">Mulai produktivitas Anda hari ini.</p>
                </div>

                <div className="bg-white p-10 rounded-[32px] shadow-2xl shadow-slate-200/60 border border-slate-100">
                    {errors && (
                        <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl mb-6 text-sm font-semibold">
                            {errors.message || "Mohon periksa kembali formulir Anda."}
                        </div>
                    )}
                    
                    <form onSubmit={handleRegister} className="space-y-5">
                        <div>
                            <label className="block text-slate-700 text-sm font-bold mb-2 ml-1">Nama Lengkap</label>
                            <input
                                type="text"
                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800"
                                placeholder="Masukkan nama Anda"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-slate-700 text-sm font-bold mb-2 ml-1">Email</label>
                            <input
                                type="email"
                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800"
                                placeholder="nama@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-slate-700 text-sm font-bold mb-2 ml-1">Kata Sandi</label>
                            <input
                                type="password"
                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800"
                                placeholder="Minimal 8 karakter"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="pb-2">
                            <label className="block text-slate-700 text-sm font-bold mb-2 ml-1">Konfirmasi Kata Sandi</label>
                            <input
                                type="password"
                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800"
                                placeholder="Ulangi kata sandi"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full py-4 text-base" disabled={loading}>
                            {loading ? "Mendaftarkan..." : "Daftar Akun"}
                        </Button>
                    </form>
                </div>

                <p className="mt-8 text-center text-slate-500 font-medium">
                    Sudah memiliki akun? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Masuk di sini</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;

import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '@src/services/authService';
import Button from '@src/components/ui/Button';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login({ email, password });
            if (localStorage.getItem('token')) {
                navigate('/');
            }
        } catch (error) {
            console.error("Login failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mt-10 px-4">
            <div className="w-full max-w-[400px]">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Selamat Datang</h2>
                    <p className="text-slate-500 font-medium text-lg">Masuk untuk mengelola tugas Anda.</p>
                </div>
                
                <div className="bg-white p-10 rounded-[32px] shadow-2xl shadow-slate-200/60 border border-slate-100">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-slate-700 text-sm font-bold mb-2 ml-1">Email</label>
                            <input
                                type="email"
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
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
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full py-4 text-base" disabled={loading}>
                            {loading ? "Memuat..." : "Masuk Sekarang"}
                        </Button>
                    </form>
                </div>

                <p className="mt-8 text-center text-slate-500 font-medium">
                    Belum punya akun? <Link to="/register" className="text-indigo-600 font-bold hover:underline">Daftar Gratis</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;

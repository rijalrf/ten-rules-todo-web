import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
            
            // Cek lagi buat mastiin token beneran masuk sebelum pindah
            if (localStorage.getItem('token')) {
                navigate('/'); // Redirect ke halaman utama
            }
        } catch (error) {
            alert("Login Gagal! Cek email & password.");
        }
    };

    return (
        <div className="card shadow p-4">
            <h3 className="text-center mb-4">Login</h3>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Masuk</button>
            </form>
            <p className="mt-3 text-center">Belum punya akun? <Link to="/register">Daftar di sini</Link></p>
        </div>
    );
};

export default LoginPage;
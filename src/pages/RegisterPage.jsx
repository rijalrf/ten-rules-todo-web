import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrors(null);
        setLoading(true);

        // 1. Validasi Front-End (Standard 6 - KISS)
        if (password !== passwordConfirm) {
            setErrors({
                password_confirmation: ["Konfirmasi password tidak cocok, Mas!"]
            });
            setLoading(false);
            return;
        }

        try {
            // 2. Kirim ke API (Standard 5 - API Integration)
            await register({
                name,
                email,
                password,
                password_confirmation: passwordConfirm
            });

            alert("Registrasi Berhasil! Silakan login.");
            navigate('/login');
        } catch (error) {
            // 3. Tangkap error validasi dari Laravel (Standard 5 - Error Handling)
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                alert("Terjadi kesalahan sistem, coba lagi nanti.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card shadow border-0 p-4">
            <div className="text-center mb-4">
                <h3 className="fw-bold text-primary">Daftar Akun</h3>
                <p className="text-muted small">Buat akun untuk mengelola tugas Mas</p>
            </div>

            {/* Alert Error General jika ada error selain validasi field */}
            {errors && !errors.name && !errors.email && !errors.password && !errors.password_confirmation && (
                <div className="alert alert-danger small">
                    Terjadi kesalahan pada data yang Mas masukkan.
                </div>
            )}

            <form onSubmit={handleRegister}>
                {/* Field Nama */}
                <div className="mb-3">
                    <label className="form-label small fw-bold">Nama Lengkap</label>
                    <input
                        type="text"
                        className={`form-control ${errors?.name ? 'is-invalid' : ''}`}
                        placeholder="Contoh: Mas Rijal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {errors?.name && <div className="invalid-feedback">{errors.name[0]}</div>}
                </div>

                {/* Field Email */}
                <div className="mb-3">
                    <label className="form-label small fw-bold">Email</label>
                    <input
                        type="email"
                        className={`form-control ${errors?.email ? 'is-invalid' : ''}`}
                        placeholder="nama@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {errors?.email && <div className="invalid-feedback">{errors.email[0]}</div>}
                </div>

                {/* Field Password */}
                <div className="mb-3">
                    <label className="form-label small fw-bold">Password</label>
                    <input
                        type="password"
                        className={`form-control ${errors?.password ? 'is-invalid' : ''}`}
                        placeholder="Minimal 8 karakter"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errors?.password && <div className="invalid-feedback">{errors.password[0]}</div>}
                </div>

                {/* Field Konfirmasi Password */}
                <div className="mb-4">
                    <label className="form-label small fw-bold">Konfirmasi Password</label>
                    <input
                        type="password"
                        className={`form-control ${errors?.password_confirmation ? 'is-invalid' : ''}`}
                        placeholder="Ulangi password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        required
                    />
                    {errors?.password_confirmation && (
                        <div className="invalid-feedback">{errors.password_confirmation[0]}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-100 fw-bold"
                    disabled={loading}
                >
                    {loading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
                </button>
            </form>

            <div className="mt-4 text-center">
                <p className="small mb-0">Sudah punya akun? <Link to="/login" className="text-decoration-none fw-bold">Login di sini</Link></p>
            </div>
        </div>
    );
};

export default RegisterPage;
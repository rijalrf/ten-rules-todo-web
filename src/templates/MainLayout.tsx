import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navItems = [
    { label: 'Tugas Saya', path: '/', protected: true },
    { label: 'Tentang', path: '/about', protected: false },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div 
            className="flex items-center space-x-2 cursor-pointer group" 
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">TodoApp</span>
          </div>

          <div className="flex items-center space-x-8">
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                (!item.protected || (item.protected && token)) && (
                  <span 
                    key={item.path}
                    className={`text-sm font-medium cursor-pointer transition-colors ${
                      location.pathname === item.path ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
                    }`}
                    onClick={() => navigate(item.path)}
                  >
                    {item.label}
                  </span>
                )
              ))}
            </div>
            
            {token && (
              <button 
                className="text-sm font-semibold text-rose-500 hover:text-rose-600 transition-colors" 
                onClick={handleLogout}
              >
                Keluar
              </button>
            )}
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;

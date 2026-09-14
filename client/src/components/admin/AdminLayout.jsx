import { Link, Outlet, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ExternalLink, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { LOGO_URL } from '../../lib/constants';
import SEO from '../seo/SEO';

export default function AdminLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: '¿Cerrar sesión?',
      text: 'Vas a tener que volver a ingresar tu email y contraseña.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#E6167E',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
    });

    if (!result.isConfirmed) return;

    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-brand-violet/[0.03]">
      <SEO title="Panel de administración" noindex />
      <header className="sticky top-0 z-30 border-b border-brand-violet/10 bg-white">
        <div className="flex items-center justify-between px-5 py-4">
          <Link to="/admin" className="flex items-center gap-2 font-heading text-lg font-bold text-brand-violet">
            <img src={LOGO_URL} alt="Vincent Travel" className="h-9 w-9" />
            Vincent Travel
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden text-sm text-brand-black/60 sm:inline">{user?.email}</span>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-brand-violet transition-colors hover:bg-brand-violet/10"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">Ver sitio</span>
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-brand-black/70 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        <Outlet />
      </main>
    </div>
  );
}

import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import HomePage from './pages/HomePage';
import PackagesPage from './pages/PackagesPage';
import PackageDetailPage from './pages/PackageDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ui/ProtectedRoute';

const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminPackageFormPage = lazy(() => import('./pages/admin/AdminPackageFormPage'));

function AdminFallback() {
  return <div className="flex min-h-screen items-center justify-center text-brand-black/40">Cargando...</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/paquetes" element={<PackagesPage />} />
          <Route path="/paquetes/:slug" element={<PackageDetailPage />} />
        </Route>

        <Route
          path="/admin/login"
          element={
            <Suspense fallback={<AdminFallback />}>
              <AdminLoginPage />
            </Suspense>
          }
        />

        <Route element={<ProtectedRoute />}>
          <Route
            element={
              <Suspense fallback={<AdminFallback />}>
                <AdminLayout />
              </Suspense>
            }
          >
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/paquetes/nuevo" element={<AdminPackageFormPage />} />
            <Route path="/admin/paquetes/:id/editar" element={<AdminPackageFormPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

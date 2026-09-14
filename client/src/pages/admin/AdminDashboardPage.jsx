import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Plus } from 'lucide-react';
import api from '../../lib/api';
import PackageTable from '../../components/admin/PackageTable';
import Button from '../../components/ui/Button';
import Pagination from '../../components/ui/Pagination';
import CategoryFilters from '../../components/packages/CategoryFilters';

const PAGE_SIZE = 8;

export default function AdminDashboardPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [page, setPage] = useState(1);

  const loadPackages = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/packages', { params: { active: 'all' } });
      setPackages(data.packages);
    } catch {
      Swal.fire('Error', 'No se pudieron cargar los paquetes', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const filtered = useMemo(() => {
    if (!category) return packages;
    return packages.filter((p) => p.categories?.includes(category));
  }, [packages, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleCategoryChange = (value) => {
    setCategory(value);
    setPage(1);
  };

  const handleDelete = async (pkg) => {
    const result = await Swal.fire({
      title: `¿Eliminar "${pkg.title}"?`,
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E6167E',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/packages/${pkg._id}`);
      setPackages((prev) => prev.filter((p) => p._id !== pkg._id));
      Swal.fire('Eliminado', 'El paquete fue eliminado.', 'success');
    } catch {
      Swal.fire('Error', 'No se pudo eliminar el paquete', 'error');
    }
  };

  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-black">Paquetes</h1>
          <p className="text-sm text-brand-black/50">Gestioná los paquetes publicados en el sitio</p>
        </div>
        <Button as={Link} to="/admin/paquetes/nuevo">
          <Plus className="h-4 w-4" />
          Nuevo paquete
        </Button>
      </div>

      <div className="mt-6">
        <CategoryFilters selected={category} onChange={handleCategoryChange} />
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="py-16 text-center text-brand-black/50">Cargando...</div>
        ) : (
          <PackageTable packages={paginated} onDelete={handleDelete} />
        )}
      </div>

      {!loading && (
        <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} className="mt-8" />
      )}
    </div>
  );
}

import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import Pagination from '../ui/Pagination';
import CategoryFilters from '../packages/CategoryFilters';
import PackageGrid from '../packages/PackageGrid';
import PackageModal from '../packages/PackageModal';
import { usePackageStore } from '../../store/packageStore';

const PAGE_SIZE = 6;

export default function PackagesPreview() {
  const { packages, loading, error, fetchPackages } = usePackageStore();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [category, setCategory] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

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

  return (
    <section id="paquetes" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Paquetes"
          title="Destinos y experiencias destacadas"
          description="Cargamos y actualizamos nuestros paquetes constantemente. Filtrá por categoría y mirá lo último que tenemos."
          align="left"
        />

        <div className="mt-8">
          <CategoryFilters selected={category} onChange={handleCategoryChange} />
        </div>

        <div className="mt-10">
          {loading && (
            <div className="py-16 text-center text-brand-black/50">Cargando paquetes...</div>
          )}
          {error && <div className="py-16 text-center text-red-500">{error}</div>}
          {!loading && !error && (
            <PackageGrid packages={paginated} onOpen={setSelectedPackage} />
          )}
        </div>

        {!loading && !error && (
          <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} className="mt-10" />
        )}

        <div className="mt-10 flex justify-center">
          <Button as={Link} to="/paquetes" variant="dark">
            Ver todos los paquetes
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <PackageModal pkg={selectedPackage} onClose={() => setSelectedPackage(null)} />
    </section>
  );
}

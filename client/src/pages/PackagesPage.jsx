import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import SectionHeading from '../components/ui/SectionHeading';
import CategoryFilters from '../components/packages/CategoryFilters';
import PackageGrid from '../components/packages/PackageGrid';
import PackageModal from '../components/packages/PackageModal';
import Pagination from '../components/ui/Pagination';
import SEO from '../components/seo/SEO';
import { usePackageStore } from '../store/packageStore';
import { CATEGORY_LABELS } from '../lib/constants';

const PAGE_SIZE = 9;

export default function PackagesPage() {
  const { packages, loading, error, fetchPackages } = usePackageStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('categoria');
  const selectedSlug = searchParams.get('paquete');
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));

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

  const selectedPackage = useMemo(
    () => packages.find((p) => p.slug === selectedSlug) || null,
    [packages, selectedSlug]
  );

  const handleCategoryChange = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set('categoria', value);
    else next.delete('categoria');
    next.delete('page');
    setSearchParams(next);
  };

  const handlePageChange = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value > 1) next.set('page', String(value));
    else next.delete('page');
    setSearchParams(next);
    document.getElementById('catalogo-top')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openPackage = (pkg) => {
    const next = new URLSearchParams(searchParams);
    next.set('paquete', pkg.slug);
    setSearchParams(next);
  };

  const closePackage = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('paquete');
    setSearchParams(next);
  };

  const categoryLabel = category ? CATEGORY_LABELS[category] : null;

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <SEO
        title={categoryLabel ? categoryLabel : 'Paquetes de Viaje'}
        description={
          categoryLabel
            ? `Paquetes de ${categoryLabel.toLowerCase()} con Vincent Travel. Consultá fechas, precios y disponibilidad.`
            : 'Catálogo completo de paquetes de viaje de Vincent Travel: egresados, educativos, nacionales, internacionales y de 15.'
        }
        path={category ? `/paquetes?categoria=${category}` : '/paquetes'}
      />
      <div id="catalogo-top" className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Catálogo"
          title="Nuestros paquetes de viaje"
          description="Filtrá por categoría para encontrar la experiencia que estás buscando."
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
          {!loading && !error && <PackageGrid packages={paginated} onOpen={openPackage} />}
        </div>

        {!loading && !error && (
          <Pagination page={currentPage} totalPages={totalPages} onChange={handlePageChange} className="mt-12" />
        )}
      </div>

      <PackageModal pkg={selectedPackage} onClose={closePackage} />
    </div>
  );
}

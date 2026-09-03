import PackageCard from './PackageCard';

export default function PackageGrid({ packages, onOpen, emptyMessage = 'No hay paquetes disponibles por el momento.' }) {
  if (!packages.length) {
    return (
      <div className="rounded-2xl border border-dashed border-brand-violet/20 py-16 text-center text-brand-black/50">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {packages.map((pkg, i) => (
        <PackageCard key={pkg._id || pkg.slug} pkg={pkg} index={i} onOpen={onOpen} />
      ))}
    </div>
  );
}

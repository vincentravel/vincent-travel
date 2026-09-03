import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { CATEGORY_LABELS } from '../../lib/constants';

function StatusBadge({ isActive }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
        isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
      }`}
    >
      {isActive ? 'Publicado' : 'Oculto'}
    </span>
  );
}

function RowActions({ pkg, onDelete, className = '' }) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <Link
        to={`/admin/paquetes/${pkg._id}/editar`}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-brand-violet hover:bg-brand-violet/10"
        aria-label="Editar paquete"
      >
        <Pencil className="h-4 w-4" />
      </Link>
      <button
        onClick={() => onDelete(pkg)}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 hover:bg-red-50"
        aria-label="Eliminar paquete"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function PackageTable({ packages, onDelete }) {
  if (!packages.length) {
    return (
      <div className="rounded-2xl border border-dashed border-brand-violet/20 py-16 text-center text-brand-black/50">
        Todavía no cargaste ningún paquete.
      </div>
    );
  }

  return (
    <>
      {/* Mobile: tarjetas apiladas, sin scroll horizontal escondido */}
      <div className="flex flex-col gap-3 sm:hidden">
        {packages.map((pkg) => (
          <div key={pkg._id} className="rounded-2xl border border-brand-violet/10 bg-white p-4">
            <div className="flex items-start gap-3">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white border border-brand-violet/10">
                {pkg.images?.[0]?.url && (
                  <img src={pkg.images[0].url} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-brand-black">{pkg.title}</p>
                <p className="text-xs text-brand-black/50">{pkg.destination}</p>
                <p className="mt-1 text-xs text-brand-black/60">
                  {pkg.categories?.map((c) => CATEGORY_LABELS[c] || c).join(', ')}
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <StatusBadge isActive={pkg.isActive} />
              <RowActions pkg={pkg} onDelete={onDelete} />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop/tablet: tabla */}
      <div className="hidden overflow-x-auto rounded-2xl border border-brand-violet/10 bg-white sm:block">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-brand-violet/5 text-xs uppercase tracking-wide text-brand-black/50">
            <tr>
              <th className="px-4 py-3">Paquete</th>
              <th className="px-4 py-3">Categorías</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-violet/10">
            {packages.map((pkg) => (
              <tr key={pkg._id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white border border-brand-violet/10">
                      {pkg.images?.[0]?.url && (
                        <img src={pkg.images[0].url} alt="" className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-brand-black">{pkg.title}</p>
                      <p className="text-xs text-brand-black/50">{pkg.destination}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-brand-black/60">
                  {pkg.categories?.map((c) => CATEGORY_LABELS[c] || c).join(', ')}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge isActive={pkg.isActive} />
                </td>
                <td className="px-4 py-3">
                  <RowActions pkg={pkg} onDelete={onDelete} className="justify-end" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

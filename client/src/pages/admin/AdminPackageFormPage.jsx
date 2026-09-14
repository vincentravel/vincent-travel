import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ArrowLeft } from 'lucide-react';
import api from '../../lib/api';
import PackageForm from '../../components/admin/PackageForm';

export default function AdminPackageFormPage() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const [defaultValues, setDefaultValues] = useState(isEditing ? null : undefined);

  useEffect(() => {
    if (!isEditing) return;
    api
      .get('/packages', { params: { active: 'all' } })
      .then(({ data }) => {
        const pkg = data.packages.find((p) => p._id === id);
        if (!pkg) return;
        setDefaultValues({
          title: pkg.title,
          description: pkg.description,
          destination: pkg.destination,
          details: pkg.details || '',
          categories: pkg.categories,
          images: pkg.images,
          videos: pkg.videos || [],
          onRequest: pkg.price?.onRequest ?? true,
          amount: pkg.price?.amount ?? '',
          isActive: pkg.isActive,
        });
      })
      .catch(() => {
        Swal.fire('Error', 'No se pudo cargar el paquete', 'error');
      });
  }, [id, isEditing]);

  const onSubmit = async (values) => {
    if (isEditing) {
      const result = await Swal.fire({
        title: '¿Guardar los cambios?',
        text: 'Se va a actualizar la información de este paquete en el sitio.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#E6167E',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Sí, guardar',
        cancelButtonText: 'Cancelar',
      });
      if (!result.isConfirmed) return;
    }

    const payload = {
      title: values.title,
      description: values.description,
      destination: values.destination,
      details: values.details,
      categories: values.categories,
      images: values.images,
      videos: values.videos,
      isActive: values.isActive,
      price: {
        onRequest: values.onRequest,
        amount: values.onRequest ? undefined : values.amount,
      },
    };

    try {
      if (isEditing) {
        await api.put(`/packages/${id}`, payload);
      } else {
        await api.post('/packages', payload);
      }
      await Swal.fire('¡Listo!', 'El paquete se guardó correctamente.', 'success');
      navigate('/admin');
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'No se pudo guardar el paquete', 'error');
    }
  };

  return (
    <div>
      <Link
        to="/admin"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-violet hover:text-brand-magenta"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al listado
      </Link>

      <h1 className="mt-4 font-heading text-2xl font-bold text-brand-black">
        {isEditing ? 'Editar paquete' : 'Nuevo paquete'}
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-violet/10 bg-white p-6">
        {isEditing && !defaultValues ? (
          <p className="text-brand-black/50">Cargando paquete...</p>
        ) : (
          <PackageForm
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            submitLabel={isEditing ? 'Guardar cambios' : 'Crear paquete'}
          />
        )}
      </div>
    </div>
  );
}

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { packageSchema } from '../../lib/schemas';
import { CATEGORIES } from '../../lib/constants';
import ImageUploader from './ImageUploader';
import VideoUploader from './VideoUploader';
import Button from '../ui/Button';

const DEFAULTS = {
  title: '',
  description: '',
  destination: '',
  details: '',
  categories: [],
  images: [],
  videos: [],
  onRequest: true,
  amount: '',
  isActive: true,
};

export default function PackageForm({ defaultValues, onSubmit, submitLabel = 'Guardar paquete' }) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(packageSchema),
    defaultValues: { ...DEFAULTS, ...defaultValues },
  });

  const onRequest = watch('onRequest');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-brand-black/70">Título</label>
          <input
            {...register('title')}
            className="mt-1 w-full rounded-xl border border-brand-violet/20 px-4 py-2.5 outline-none focus:border-brand-magenta"
            placeholder="Ej: Bariloche Full - Egresados"
          />
          {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-brand-black/70">Destino</label>
          <input
            {...register('destination')}
            className="mt-1 w-full rounded-xl border border-brand-violet/20 px-4 py-2.5 outline-none focus:border-brand-magenta"
            placeholder="Ej: Bariloche, Argentina"
          />
          {errors.destination && (
            <p className="mt-1 text-xs text-red-500">{errors.destination.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-brand-black/70">Descripción</label>
        <textarea
          {...register('description')}
          rows={4}
          className="mt-1 w-full rounded-xl border border-brand-violet/20 px-4 py-2.5 outline-none focus:border-brand-magenta"
          placeholder="Contá de qué se trata el paquete..."
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-brand-black/70">
          Fechas / observaciones (opcional)
        </label>
        <textarea
          {...register('details')}
          rows={2}
          className="mt-1 w-full rounded-xl border border-brand-violet/20 px-4 py-2.5 outline-none focus:border-brand-magenta"
          placeholder="Ej: Salidas todos los viernes de enero..."
        />
      </div>

      <div>
        <label className="text-sm font-medium text-brand-black/70">Categorías</label>
        <Controller
          control={control}
          name="categories"
          render={({ field }) => (
            <div className="mt-2 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => {
                const checked = field.value?.includes(c.value);
                return (
                  <button
                    type="button"
                    key={c.value}
                    onClick={() =>
                      field.onChange(
                        checked
                          ? field.value.filter((v) => v !== c.value)
                          : [...field.value, c.value]
                      )
                    }
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      checked
                        ? 'border-brand-magenta bg-brand-magenta text-white'
                        : 'border-brand-violet/20 text-brand-violet hover:border-brand-magenta'
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          )}
        />
        {errors.categories && (
          <p className="mt-1 text-xs text-red-500">{errors.categories.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-brand-black/70">Imágenes</label>
        <div className="mt-2">
          <Controller
            control={control}
            name="images"
            render={({ field }) => (
              <ImageUploader images={field.value} onChange={field.onChange} />
            )}
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-brand-black/70">Videos (opcional)</label>
        <div className="mt-2">
          <Controller
            control={control}
            name="videos"
            render={({ field }) => (
              <VideoUploader videos={field.value} onChange={field.onChange} />
            )}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-brand-black/70">
            <input type="checkbox" {...register('onRequest')} className="h-4 w-4 accent-brand-magenta" />
            Precio a consultar
          </label>
          {!onRequest && (
            <input
              type="number"
              step="0.01"
              {...register('amount')}
              className="mt-2 w-full rounded-xl border border-brand-violet/20 px-4 py-2.5 outline-none focus:border-brand-magenta"
              placeholder="Monto en $"
            />
          )}
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-brand-black/70">
            <input type="checkbox" {...register('isActive')} className="h-4 w-4 accent-brand-magenta" />
            Publicado (visible en el sitio)
          </label>
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-fit">
        {isSubmitting ? 'Guardando...' : submitLabel}
      </Button>
    </form>
  );
}

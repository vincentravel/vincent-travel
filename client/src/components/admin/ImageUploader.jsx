import { useRef, useState } from 'react';
import { ImagePlus, Loader2, Star, X } from 'lucide-react';
import api from '../../lib/api';

export default function ImageUploader({ images, onChange }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList);
    if (!files.length) return;

    setUploading(true);
    try {
      const uploaded = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append('image', file);
        const { data } = await api.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        uploaded.push({ ...data, isCover: false });
      }
      const next = [...images, ...uploaded];
      // si todavía no hay ninguna marcada como principal, la primera pasa a serlo
      if (!next.some((img) => img.isCover) && next.length) {
        next[0] = { ...next[0], isCover: true };
      }
      onChange(next);
    } catch {
      // el estado se mantiene sin cambios; el form muestra el error al guardar si corresponde
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleRemove = async (img) => {
    const remaining = images.filter((i) => i.publicId !== img.publicId);
    if (img.isCover && remaining.length) {
      remaining[0] = { ...remaining[0], isCover: true };
    }
    onChange(remaining);
    api.delete(`/upload/${encodeURIComponent(img.publicId)}`).catch(() => null);
  };

  const handleSetCover = (img) => {
    onChange(images.map((i) => ({ ...i, isCover: i.publicId === img.publicId })));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {images.map((img) => (
          <div
            key={img.publicId}
            className={`group relative h-24 w-24 overflow-hidden rounded-xl ring-2 ${
              img.isCover ? 'ring-brand-magenta' : 'ring-transparent'
            }`}
          >
            <img src={img.url} alt="" className="h-full w-full object-cover" />
            {img.isCover && (
              <span className="absolute left-1 top-1 flex items-center gap-0.5 rounded-full bg-brand-magenta px-1.5 py-0.5 text-[9px] font-semibold text-white">
                <Star className="h-2.5 w-2.5" fill="currentColor" />
                Portada
              </span>
            )}
            <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/60 via-transparent to-transparent p-1 opacity-0 transition-opacity group-hover:opacity-100">
              {!img.isCover && (
                <button
                  type="button"
                  onClick={() => handleSetCover(img)}
                  title="Marcar como portada"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-brand-violet hover:bg-white"
                >
                  <Star className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => handleRemove(img)}
                title="Eliminar"
                className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-brand-violet/30 text-brand-violet/60 transition-colors hover:border-brand-magenta hover:text-brand-magenta disabled:opacity-50"
        >
          {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ImagePlus className="h-5 w-5" />}
          <span className="text-[11px]">{uploading ? 'Subiendo...' : 'Agregar'}</span>
        </button>
      </div>
      {images.length > 1 && (
        <p className="mt-2 text-xs text-brand-black/40">
          Pasá el mouse sobre una imagen y tocá la estrella para marcarla como portada.
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}

import { useRef, useState } from 'react';
import { FileText, Loader2, Upload, X } from 'lucide-react';
import api from '../../lib/api';

// PDFs de itinerario / información del viaje, uno o varios por paquete. Se suben a través
// de nuestro servidor (son livianos comparados con los videos) a Cloudinary como "raw".
export default function PdfUploader({ pdfs, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList);
    if (!files.length) return;

    setUploading(true);
    setError('');
    try {
      const uploaded = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append('pdf', file);
        const { data } = await api.post('/upload/pdf', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        uploaded.push(data);
      }
      onChange([...pdfs, ...uploaded]);
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo subir el archivo');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleRemove = (pdf) => {
    onChange(pdfs.filter((p) => p.publicId !== pdf.publicId));
    api.delete(`/upload/pdf/${encodeURIComponent(pdf.publicId)}`).catch(() => null);
  };

  const handleNameChange = (pdf, name) => {
    onChange(pdfs.map((p) => (p.publicId === pdf.publicId ? { ...p, name } : p)));
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        {pdfs.map((pdf) => (
          <div
            key={pdf.publicId}
            className="flex items-center gap-3 rounded-xl border border-brand-violet/15 bg-brand-violet/5 px-4 py-2.5"
          >
            <FileText className="h-5 w-5 shrink-0 text-brand-magenta" />
            <input
              value={pdf.name || ''}
              onChange={(e) => handleNameChange(pdf, e.target.value)}
              placeholder="Nombre a mostrar (ej: Itinerario)"
              className="min-w-0 flex-1 rounded-lg border border-brand-violet/20 bg-white px-3 py-1.5 text-sm outline-none focus:border-brand-magenta"
            />
            <a
              href={pdf.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-xs font-medium text-brand-violet hover:text-brand-magenta"
            >
              Ver
            </a>
            <button
              type="button"
              onClick={() => handleRemove(pdf)}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-brand-black/40 hover:bg-red-50 hover:text-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand-violet/30 px-4 py-3 text-sm text-brand-violet/60 transition-colors hover:border-brand-magenta hover:text-brand-magenta disabled:opacity-50"
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {uploading ? 'Subiendo...' : 'Agregar PDF (itinerario, información del viaje, etc.)'}
        </button>
      </div>

      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}

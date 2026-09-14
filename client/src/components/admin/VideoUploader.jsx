import { useRef, useState } from 'react';
import { Film, Loader2, Video, X } from 'lucide-react';
import api from '../../lib/api';

// Los videos se suben directo del navegador a Cloudinary (no pasan por nuestro servidor)
// usando una firma que nos da el backend, porque los archivos de video suelen superar
// el límite de tamaño de request que permite Vercel.
async function uploadDirectToCloudinary(file) {
  const { data: sig } = await api.get('/upload/video-signature');

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', sig.apiKey);
  formData.append('timestamp', sig.timestamp);
  formData.append('signature', sig.signature);
  formData.append('folder', sig.folder);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/video/upload`, {
    method: 'POST',
    body: formData,
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error?.message || 'Error subiendo el video');
  return { url: result.secure_url, publicId: result.public_id };
}

export default function VideoUploader({ videos, onChange }) {
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
        uploaded.push(await uploadDirectToCloudinary(file));
      }
      onChange([...videos, ...uploaded]);
    } catch (err) {
      setError(err.message || 'No se pudo subir el video');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleRemove = async (video) => {
    onChange(videos.filter((v) => v.publicId !== video.publicId));
    api.delete(`/upload/video/${encodeURIComponent(video.publicId)}`).catch(() => null);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {videos.map((video) => (
          <div
            key={video.publicId}
            className="group relative flex h-24 w-24 flex-col items-center justify-center gap-1 overflow-hidden rounded-xl bg-brand-violet/5 text-brand-violet"
          >
            <Video className="h-6 w-6" />
            <span className="px-1 text-center text-[10px] leading-tight text-brand-violet/70">Video</span>
            <button
              type="button"
              onClick={() => handleRemove(video)}
              className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-brand-violet/30 text-brand-violet/60 transition-colors hover:border-brand-magenta hover:text-brand-magenta disabled:opacity-50"
        >
          {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Film className="h-5 w-5" />}
          <span className="text-[11px]">{uploading ? 'Subiendo...' : 'Agregar video'}</span>
        </button>
      </div>

      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}

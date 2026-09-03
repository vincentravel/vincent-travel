import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginSchema } from '../../lib/schemas';
import api from '../../lib/api';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/ui/Button';
import { LOGO_URL, HERO_VIDEO_URL } from '../../lib/constants';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values) => {
    setServerError('');
    try {
      const { data } = await api.post('/auth/login', values);
      login(data.token, data.user);
      navigate('/admin');
    } catch (err) {
      setServerError(err.response?.data?.message || 'No se pudo iniciar sesión');
    }
  };

  return (
    <div className="grid min-h-screen bg-white md:grid-cols-2">
      <div className="relative hidden overflow-hidden md:block">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-violet/90 via-brand-violet/30 to-brand-black/40" />
        <div className="relative flex h-full flex-col justify-end p-12">
          <img src={LOGO_URL} alt="Vincent Travel" className="h-16 w-16" />
          <p className="mt-6 max-w-xs font-heading text-2xl font-bold text-white">
            Gestioná los paquetes de Vincent Travel
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-5 py-16">
        <div className="w-full max-w-sm">
          <img src={LOGO_URL} alt="Vincent Travel" className="mx-auto h-16 w-16 md:hidden" />

          <h1 className="mt-4 text-center font-heading text-2xl font-bold text-brand-black">
            Iniciar sesión
          </h1>
          <p className="mt-1 text-center text-sm text-brand-black/50">
            Ingresá con tu cuenta para continuar
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-brand-black/70">Email</label>
              <input
                type="email"
                {...register('email')}
                className="mt-1 w-full rounded-xl border border-brand-violet/20 px-4 py-2.5 outline-none focus:border-brand-magenta"
                placeholder="tu@email.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-brand-black/70">Contraseña</label>
              <input
                type="password"
                {...register('password')}
                className="mt-1 w-full rounded-xl border border-brand-violet/20 px-4 py-2.5 outline-none focus:border-brand-magenta"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            {serverError && <p className="text-sm text-red-500">{serverError}</p>}

            <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
              {isSubmitting ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

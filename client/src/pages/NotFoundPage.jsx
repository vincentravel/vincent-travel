import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import SEO from '../components/seo/SEO';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-brand-gradient px-5 text-center">
      <SEO title="Página no encontrada" noindex />
      <span className="font-heading text-8xl font-extrabold text-white/20">404</span>
      <h1 className="font-heading text-2xl font-bold text-white">Página no encontrada</h1>
      <p className="text-white/70">La página que buscás no existe o fue movida.</p>
      <Button as={Link} to="/" className="mt-2">
        Volver al inicio
      </Button>
    </div>
  );
}

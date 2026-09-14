import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// React Router no hace scroll al top al navegar entre rutas (a diferencia de un sitio
// tradicional). Sin esto, al ir de Home a otra página se mantiene el scroll donde estaba.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // El sitio usa scroll-behavior: smooth global, así que un scrollTo normal queda
    // animando y puede no llegar a 0 si el contenido de la página nueva todavía se está
    // cargando. Lo forzamos instantáneo para esta transición de ruta.
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    // Si se restaura scroll-behavior en el mismo tick, el navegador puede animar el
    // scroll igual (lo procesa async). Esperamos un frame antes de volver a "smooth".
    requestAnimationFrame(() => {
      root.style.scrollBehavior = previous;
    });
  }, [pathname]);

  return null;
}

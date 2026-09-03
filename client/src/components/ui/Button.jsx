import { forwardRef } from 'react';

const VARIANTS = {
  primary:
    'bg-brand-magenta text-white hover:bg-brand-magentaLight shadow-lg shadow-brand-magenta/20',
  outline:
    'border-2 border-white/80 text-white hover:bg-white hover:text-brand-violet',
  dark: 'bg-brand-black text-white hover:bg-brand-charcoal',
  ghost: 'text-brand-violet hover:bg-brand-violet/5',
  light: 'bg-white text-brand-violet hover:bg-white/90 shadow-lg shadow-black/10',
};

const Button = forwardRef(function Button(
  { as: Component = 'button', variant = 'primary', className = '', children, ...props },
  ref
) {
  return (
    <Component
      ref={ref}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-heading font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
});

export default Button;

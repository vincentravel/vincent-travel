export default function Chip({ active = false, className = '', children, ...props }) {
  return (
    <button
      type="button"
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 border ${
        active
          ? 'bg-brand-magenta border-brand-magenta text-white'
          : 'border-brand-violet/20 text-brand-violet hover:border-brand-magenta hover:text-brand-magenta'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

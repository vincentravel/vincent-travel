import Chip from '../ui/Chip';
import { CATEGORIES } from '../../lib/constants';

export default function CategoryFilters({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      <Chip active={!selected} onClick={() => onChange(null)}>
        Todos
      </Chip>
      {CATEGORIES.map((c) => (
        <Chip key={c.value} active={selected === c.value} onClick={() => onChange(c.value)}>
          {c.label}
        </Chip>
      ))}
    </div>
  );
}

import { PencilIcon } from '@heroicons/react/24/solid';
import { TableCard } from '../molecules/TableCard';

export default function TablesColumn() {
  return (
    <div className="flex flex-col items-center justify-start w-full gap-3 px-5">
      <h2 className="text-lg">Mesas</h2>
      <button className="btn btn-outline text-base-content w-full btn-warning">
        <PencilIcon className="w-5 h-5" /> Editar
      </button>
      <div className="grid grid-cols-2 gap-4">
        <TableCard />
        <TableCard />
        <TableCard />
      </div>
    </div>
  );
}

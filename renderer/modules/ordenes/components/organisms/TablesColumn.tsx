import { ButtonAdd } from '../atoms/ButtonAdd';
import { TableCard } from '../molecules/TableCard';

export function TablesColumn() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-3 px-5">
      <h1>Mesas</h1>
      <ButtonAdd />
      <div className="grid grid-cols-2 gap-4">
        <TableCard />
        <TableCard />
        <TableCard />
      </div>
    </div>
  );
}

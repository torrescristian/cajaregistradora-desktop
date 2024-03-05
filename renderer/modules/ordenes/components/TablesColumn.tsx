import { ButtonAdd } from './ButtonAdd';
import { TableCard } from './TableCard';

export function TablesColumn() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-3 px-5">
      <h1>Mesas</h1>
      <ButtonAdd />
      <TableCard />
    </div>
  );
}

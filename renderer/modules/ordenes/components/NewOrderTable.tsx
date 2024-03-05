import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { newColumnDefOrder } from './NewColumnOrder';
import { ITable } from '../interfaces/ITable';
import { ButtonAdd } from './ButtonAdd';
import { TablesColumn } from './TablesColumn';
import { DeliveriesColumn } from './DeliviriesColumn';
import { OrdersColumn } from './OrdersColumn';

interface IProps {
  tables: ITable[];
  setTableToUpdate: (table: ITable) => void;
}

export default function NewOrderTable({ tables, setTableToUpdate }: IProps) {
  const NewTableInstanceOrder = useReactTable({
    columns: newColumnDefOrder,
    data: tables,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <section className="flex flex-row w-full text-center divide-x">
      <TablesColumn />
      <DeliveriesColumn />
      <OrdersColumn />
    </section>
  );
}

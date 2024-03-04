import {
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from '@tanstack/react-table';
import { newColumnDefOrder } from './NewColumnOrder';
import { ITable } from '../interfaces/ITable';

interface IProps {
    tables: ITable[];
    setTableToUpdate: (table: ITable) => void;
  }

export default function NewOrderTable({tables, setTableToUpdate}:IProps) {
    const NewTableInstanceOrder = useReactTable({
        columns: newColumnDefOrder,
        data: tables,
        getCoreRowModel: getCoreRowModel(),
    })
    return (
        <table className="table-fixed w-full border-collapse border border-slate-500">
            <thead>
                {NewTableInstanceOrder.getHeaderGroups().map(({ id, headers }) => (
                <tr key={id}>
                {headers.map(({ id: headerId, column, getContext }) => (
                    <th key={headerId}>
                    {flexRender(column.columnDef.header, getContext())}
                    </th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody>
                
            </tbody>
        </table>
    )
}
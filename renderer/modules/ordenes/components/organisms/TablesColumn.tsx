import { CheckIcon, PencilIcon, PlusIcon } from '@heroicons/react/24/solid';
import { TableCard } from '../molecules/TableCard';
import { useState } from 'react';
import {
  getOpenModal,
  useModalStore,
} from '@/modules/common/contexts/useModalStore';
import CreateTableModal from './CreateTableModal';
import useTablesQuery from '../../hooks/useTablesQuery';
import { ITable } from '../../interfaces/ITable';

export default function TablesColumn() {
  const [updateMode, setUpdateMode] = useState(false);
  const openModal = useModalStore(getOpenModal);
  const tablesQuery = useTablesQuery();
  const tablesByCategory = tablesQuery.data?.reduce(
    (acc: { [id: string]: ITable[] }, table) => {
      if (!acc[table.category.id]) {
        acc[table.category.id] = [];
      }
      acc[table.category.id].push(table);
      return acc;
    },
    {},
  );

  return (
    <div className="flex flex-col items-center justify-start w-full gap-3 px-5">
      <h2 className="text-lg">Mesas</h2>
      {updateMode ? (
        <div className="grid grid-cols-2">
          <button
            onClick={() => openModal(<CreateTableModal />)}
            className="btn btn-outline text-base-content w-full btn-success"
          >
            <PlusIcon className="w-5 h-5" /> Agregar
          </button>
          <button
            onClick={() => setUpdateMode(false)}
            className="btn btn-outline text-base-content w-full btn-info"
          >
            <CheckIcon className="w-5 h-5" /> Finalizar
          </button>
        </div>
      ) : (
        <button
          onClick={() => setUpdateMode(true)}
          className="btn btn-outline text-base-content w-full btn-warning"
        >
          <PencilIcon className="w-5 h-5" /> Editar
        </button>
      )}
      <div className="flex flex-col gap-4 text-neutral w-full">
        {tablesByCategory &&
          Object.keys(tablesByCategory).map((categoryId) => (
            <div
              key={categoryId}
              className="flex flex-col gap-4 w-full"
              style={{
                backgroundColor: tablesByCategory[categoryId][0].category.color,
              }}
            >
              <h3 className="text-lg">
                {tablesByCategory[categoryId][0].category.name}
              </h3>
              <div className="grid lg:grid-cols-2">
                {tablesByCategory[categoryId].map((table) => (
                  <TableCard key={table.id} table={table} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

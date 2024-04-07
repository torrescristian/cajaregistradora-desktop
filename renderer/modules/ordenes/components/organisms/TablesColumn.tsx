import { CheckIcon, PencilIcon, PlusIcon } from '@heroicons/react/24/solid';
import { TableCard } from '../molecules/TableCard';
import { useState } from 'react';
import {
  getOpenModal,
  useModalStore,
} from '@/modules/common/contexts/useModalStore';
import CreateTableModal from './CreateTableModal';
import useTablesQuery from '../../hooks/useTablesQuery';

export default function TablesColumn() {
  const [updateMode, setUpdateMode] = useState(false);
  const openModal = useModalStore(getOpenModal);
  const tablesQuery = useTablesQuery();

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
      <div className="grid lg:grid-cols-2 gap-4 w-full">
        {tablesQuery.data?.map((table) => (
          <TableCard key={table.id} table={table} />
        ))}
      </div>
    </div>
  );
}

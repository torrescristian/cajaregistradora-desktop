import NewOrderTable from '../components/NewOrderTable';
import { useState } from 'react';
import { ITable } from '../interfaces/ITable';

export default function NewOrdenesPage() {
  const [tableToUpdate, setTableToUpdate] = useState<ITable | null>(null);
  const updateMode = !!tableToUpdate;
  const closeUpdateMode = () => {
    setTableToUpdate(null);
  };
  return (
    <section className="flex items-center justify-center p-3">
      <NewOrderTable setTableToUpdate={setTableToUpdate} tables={[]} />
    </section>
  );
}

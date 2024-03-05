import OrdenesPage from '@/modules/ordenes/OrdenesPage';
import NewOrdenesPage from '@/modules/ordenes/components/pages/NewOrdenesPage';

function ordenes() {
  return (
    <div>
      <NewOrdenesPage />
      <OrdenesPage />
    </div>
  );
}

export default ordenes;

import OrdenesPage from '@/modules/ordenes/OrdenesPage';
import NewOrdenesPage from '@/modules/ordenes/utils/NewOrdenesPage';

function ordenes() {
  return (
    <>
      <NewOrdenesPage />
      <OrdenesPage />
    </>
  );
}

export default ordenes;

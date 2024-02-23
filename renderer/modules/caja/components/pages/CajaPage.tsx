import PageLayout from '@/modules/common/components/PageLayout';
import { useAuthState } from '@/modules/common/contexts/AuthContext';

import CreateListTabs from '../../../common/components/CreateListTabs';
import CashBalanceRender from '../organisms/CashBalanceRender';
import ConfirmExpensesModal from '../ConfirmExpensesModal';
import CashBalanceHistory from '../CashBalanceHistory';
import AddToBalance from './AddToBalance';

export default function CajaPage() {
  const { isOwner } = useAuthState();
  const tabs = [
    { label: 'Caja', component: <CashBalanceRender /> },
    { label: 'Añadir', component: <AddToBalance /> },
    { label: 'Historial', component: <CashBalanceHistory /> },    
  ];

  if (isOwner) {
    tabs.push({
      label: 'Confirmar pendientes',
      component: <ConfirmExpensesModal />,
    });
  }

  return (
    <PageLayout>
      <CreateListTabs tabs={tabs} />
    </PageLayout>
  );
}

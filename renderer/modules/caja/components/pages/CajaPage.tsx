import PageLayout from '@/modules/common/components/templates/PageLayout';
import { useAuthState } from '@/modules/common/contexts/AuthContext';

import CreateListTabs from '../../../common/components/molecules/CreateListTabs';
import CashBalanceRender from '../organisms/CashBalanceRender';
import ConfirmExpensesModal from '../ConfirmExpensesModal';
import CashBalanceHistory from '../CashBalanceHistory';

export default function CajaPage() {
  const { isOwner } = useAuthState();
  const tabs = [
    { label: 'Caja', component: <CashBalanceRender /> },
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

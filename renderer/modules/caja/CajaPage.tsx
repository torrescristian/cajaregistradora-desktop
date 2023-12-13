import PageLayout from '@/modules/common/components/PageLayout';
import React from 'react';
import CreateListTabs from '../common/components/CreateListTabs';
import CashBalanceRender from './components/CashBalanceRender';
import ReturnCashBalance from './components/ReturnCashBalance';
import ConfirmExpensesModal from './components/ConfirmExpensesModal';
import { useAuthState } from '../common/contexts/AuthContext';

export default function CajaPage() {
  const { isOwner } = useAuthState();
  const tabs = [
    { label: 'Caja', component: <CashBalanceRender /> },
    { label: 'Retiro de fondos', component: <ReturnCashBalance /> },
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

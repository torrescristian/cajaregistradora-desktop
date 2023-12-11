import PageLayout from '@/modules/common/components/PageLayout';
import React from 'react';
import CreateListTabs from '../common/components/CreateListTabs';
import CashBalanceRender from './components/CashBalanceRender';
import ReturnCashBalance from './components/ReturnCashBalance';

export default function CajaPage() {
  return (
    <PageLayout>
      <CreateListTabs name="Caja">
        {(createMode) =>
          createMode ? <ReturnCashBalance /> : <CashBalanceRender />
        }
      </CreateListTabs>
    </PageLayout>
  );
}

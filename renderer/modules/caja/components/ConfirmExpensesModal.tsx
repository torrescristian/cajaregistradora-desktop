import React, { useState } from 'react';
import { RenderIf } from '@/modules/common/components/RenderIf';
import { useAuthState } from '@/modules/common/contexts/AuthContext';
import ExpensesPending from './ExpensesPending';
import TicketsPending from './TicketsPending';

export default function ConfirmExpensesModal() {
  const { isOwner } = useAuthState();

  return (
    <div className="flex flex-col w-full p-5 gap-10">
      <RenderIf condition={isOwner}>
        <TicketsPending />
        <ExpensesPending />
      </RenderIf>
    </div>
  );
}

import ITicket, { TICKET_STATUS } from '@/interfaces/ITicket';
import strapi from '@/libs/strapi';
import TicketSchema from '@/schemas/TicketSchema';
import { useMutation } from '@tanstack/react-query';

type ICreateTicketMutation = Omit<ITicket, 'id' | 'status'>;

export default function useCreateTicketMutation() {
  return useMutation(async (data: ICreateTicketMutation) => {
    await TicketSchema().validate(data);

    const res = await strapi.create('ticket', {
      ...data,
      status: TICKET_STATUS.PAID,
    } as ITicket);

    return res;
  });
}

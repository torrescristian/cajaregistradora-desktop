import strapi from '@/libs/strapi';
import TicketSchema from '@/schemas/TicketSchema';
import { useMutation } from '@tanstack/react-query';

export default function useCreateTicketMutation() {
  return useMutation(async (data) => {
    await TicketSchema.validate(data);

    const res = await strapi.create('ticket', data);
    console.log('🚀 ~ file: useCreateTicketMutation.tsx:8', res);

    return res;
  });
}

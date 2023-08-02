import IOrder, { IOrderUI } from '@/interfaces/IOrder';
import { INativeResponse } from '@/interfaces/utils';
import strapi from '@/libs/strapi';
import { useQuery } from '@tanstack/react-query';

const getOrderQueryKey = () => 'orders';

const parseOrderFacade = (order: IOrder): IOrderUI => {
  const { id, attributes } = order;
  console.log(order);
  return {
    id: id,
    clientName: attributes.client.name,
    clientPhone: attributes.client.phone_number,
    totalPrice: attributes.total_price,
    items: attributes.items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      totalPrice: item.total_price,
    })),
  };
};

export default function useOrderQuery() {
  return useQuery<IOrderUI>([getOrderQueryKey()], async () => {
    const order = (await strapi.find(
      'orders',
    )) as unknown as INativeResponse<IOrder>;
    const [orders] = (order.data || [[]]).map(parseOrderFacade);
    return orders;
  });
}

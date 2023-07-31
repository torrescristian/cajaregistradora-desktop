import IOrder, { IOrderUI } from '@/interfaces/IOrder';
import { INativeResponse, IResponsePage } from '@/interfaces/utils';
import strapi from '@/libs/strapi';
import { useQuery } from '@tanstack/react-query';

const getOrderQueryKey = () => 'orders';

const parseOrderFacade = (orders: IOrder): IOrderUI => {
  const { id, attributes } = orders;
  return {
    id: id,
    totalPrice : attributes.total_price,
    lastUpdate : attributes.last_update,
    }
}

export default function useOrderQuery() {
  return useQuery<IOrderUI>([getOrderQueryKey()], async () => {
    const order = (await strapi.find('orders')) as unknown as INativeResponse<IOrder>;
    const [orders] = (order.data || [[]]).map(parseOrderFacade);
    return orders;
    
  })
};

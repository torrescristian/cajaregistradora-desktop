import { IOrderResponse, IOrderUI } from '@/interfaces/IOrder';
import strapi from '@/libs/strapi';
import { useQuery } from '@tanstack/react-query';

const getOrderQueryKey = () => 'orders';

const parseOrderFacade = (order: IOrderResponse): IOrderUI[] => {
  return order.results.map((props) => {
    return {
      id: props.id,
      clientName: props.client.name,
      clientPhone: props.client.phone_number,
      clientAddress: props.client.address,
      totalPrice: props.total_price,
      items: props.items,
      additionalDetails: props.additionalDetails,
    };
  });
};

export default function useOrderQuery() {
  return useQuery<IOrderUI[]>([getOrderQueryKey()], async () => {
    const orderResponse = (await strapi.find('orders', {
      populate: '*',
    })) as unknown as IOrderResponse;
    return parseOrderFacade(orderResponse);
  });
}

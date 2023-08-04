import { IOrderResponse, IOrderUI } from '@/interfaces/IOrder';
import strapi from '@/libs/strapi';
import { useQuery } from '@tanstack/react-query';
import IClient from '@/interfaces/IClient';

const getOrderQueryKey = () => 'orders';

const parseOrderFacade = (order: IOrderResponse): IOrderUI[] => {
  return order.results.map((props) => {
    const { name, phone_number,address } = props.client as IClient 
    return {
      id: props.id,
      clientName: name,
      clientPhone: phone_number,
      clientAddress: address,
      totalPrice: props.total_price,
      items: props.items,
      additionalDetails: props.additional_details,
    };
  });
};

export default function useOrderQuery() {
  return useQuery<IOrderUI[]>([getOrderQueryKey()], async () => {
    const orderResponse = (await strapi.find('orders', {
      populate: '*',
    })) as unknown as IOrderResponse;
    return parseOrderFacade(orderResponse)
  });
}

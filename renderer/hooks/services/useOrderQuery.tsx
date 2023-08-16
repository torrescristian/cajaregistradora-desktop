import { IOrderResponse, IOrderUI, ORDER_STATUS } from '@/interfaces/IOrder';
import strapi from '@/libs/strapi';
import { useQuery } from '@tanstack/react-query';
import IClient from '@/interfaces/IClient';

export const getOrderQueryKey = () => 'orders';

const parseOrderFacade = (order: IOrderResponse): IOrderUI[] => {
  return order.results.map((props) => {
    const { name, phone_number, address } = props.client as IClient;
    return {
      id: props.id,
      clientName: name,
      clientPhone: phone_number,
      clientAddress: address,
      totalPrice: props.total_price,
      items: props.items,
      additionalDetails: props.additional_details,
      createdAt: props.createdAt!,
      updatedAt: props.updatedAt!,
      status: props.status,
    };
  });
};

export default function useOrderQuery() {
  return useQuery<IOrderUI[]>([getOrderQueryKey()], async () => {
    const orderResponse = (await strapi.find('orders', {
      filters: {
        status: ORDER_STATUS.PENDING,
      },
      populate: ['client', 'items.product'],
    })) as unknown as IOrderResponse;
    return parseOrderFacade(orderResponse);
  });
}

import {IOrderResponse, IOrderUI } from '@/interfaces/IOrder';
import strapi from '@/libs/strapi';
import { useQuery } from '@tanstack/react-query';
import IClient from '@/interfaces/IClient';

const getOrderQueryKey = () => 'orders';

const parseOrderFacade = (order: IOrderResponse): IOrderUI[] => {
  
  return order.results.map(
    (props) => {
       const { name, phone_number } = props.client as IClient 
     return {
       id: props.id,
       clientName: name,
       clientPhone: phone_number,
       totalPrice: props.total_price,
       items : props.items
      };
    })
  }

export default function useOrderQuery() {
  return useQuery<IOrderUI[]>([getOrderQueryKey()], async () => {
    const orderResponse = (await strapi.find(
      'orders',
    )) as unknown as IOrderResponse;
    return parseOrderFacade(orderResponse);
  });
}

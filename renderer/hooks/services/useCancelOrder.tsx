import {IOrderSingleResponse, ORDER_STATUS } from '@/interfaces/IOrder';
import strapi from '@/libs/strapi';
import OrderSchema from '@/schemas/OrderSchema';
import { useMutation } from '@tanstack/react-query';
import * as yup from 'yup';
import useUpdateStockProductMutation from './useUpdateStockProductMutation';

export default function useCancelOrderMutation() {
  const updateStockMutation = useUpdateStockProductMutation();

  return useMutation(async (orderId: number) => {
    await yup.number().validate(orderId);

    const updateOrderResult = (await strapi.update('orders', orderId, {
      status: ORDER_STATUS.CANCELED,
    })) as unknown as IOrderSingleResponse;

    await OrderSchema().validate(updateOrderResult.results);

    const promises = updateOrderResult.results.items.map(async (item) => {
      const { product, quantity } = item;
      const stock_per_product = product!.stock_per_product;
      const { stock } = stock_per_product;
      const newStock = stock + quantity;
      await updateStockMutation.mutateAsync({
        stock: newStock,
        stock_per_product,
      });
    });

    const stockRestored = await Promise.allSettled(promises);

    const rejected = stockRestored.filter(
      ({ status }) => status === 'rejected',
    );

    if (rejected.length > 0) {
      throw new Error('Failed to update stock');
    }

    return {
      updateOrderResult,
      stockRestored,
    };
  });
}

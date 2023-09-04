import { IOrderSingleResponse, ORDER_STATUS } from '@/interfaces/IOrder';
import strapi from '@/libs/strapi';
import OrderSchema from '@/schemas/OrderSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as yup from 'yup';
import useUpdateVariantMutation from './useUpdateVariantMutation';
import { getOrderQueryKey } from './useOrderQuery';

export default function useCancelOrderMutation() {
  const updateVariantMutation = useUpdateVariantMutation();
  const queryClient = useQueryClient();

  return useMutation(async (orderId: number) => {
    await yup.number().validate(orderId);

    const updateOrderResult = (await strapi.update('orders', orderId, {
      status: ORDER_STATUS.CANCELLED,
    })) as unknown as IOrderSingleResponse;

    await OrderSchema().validate(updateOrderResult.results);

    const promises = updateOrderResult.results.items.map(async (item) => {
      const { quantity, selectedVariant } = item;
      const stockPerVariant = selectedVariant.stock_per_variant;
      const { stock } = stockPerVariant;
      const newStock = stock + quantity;
      await updateVariantMutation.mutateAsync({
        newStock: newStock,
        stockPerVariantId: stockPerVariant.id!,
        variantId: selectedVariant.id!,
        price: selectedVariant.price,
      });
    });

    const stockRestored = await Promise.allSettled(promises);

    const rejected = stockRestored.filter(
      ({ status }) => status === 'rejected',
    );

    if (rejected.length > 0) {
      throw new Error('Failed to update stock');
    }

    queryClient.invalidateQueries([getOrderQueryKey()]);

    return {
      updateOrderResult,
      stockRestored,
    };
  });
}

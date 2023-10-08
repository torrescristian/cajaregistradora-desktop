import { IOrderResponse, ORDER_STATUS } from '@/interfaces/IOrder';
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
    })) as unknown as IOrderResponse;

    await OrderSchema().validate(updateOrderResult.results);

    const promises = updateOrderResult.results.map((order) =>
      order.items.map(async (item) => {
        const { quantity, selectedVariant } = item;
        const stock = selectedVariant.stock_per_variant?.stock!;
        const id = selectedVariant.stock_per_variant?.id!;

        const newStock = stock + quantity;
        await updateVariantMutation.mutateAsync({
          newStock: newStock,
          stockPerVariantId: id,
          variantId: selectedVariant.id!,
          price: selectedVariant.price,
          name: selectedVariant.name,
        });
      }),
    );

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

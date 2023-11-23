import { useMutation } from '@tanstack/react-query';
import useUpdateStockPerVariantMutation from '@/modules/reabastecer/hooks/useUpdateStockPerVariantMutation';
import { ICartItem } from '@/modules/cart/interfaces/ICart';

export default function useReturnStock() {
  const updateStockPerVariantMutation = useUpdateStockPerVariantMutation();
  return useMutation(async (cartItems: ICartItem[]) => {
    return cartItems.map(async (item: ICartItem) => {
      const { quantity, selectedVariant } = item;
      const stock = selectedVariant.stock_per_variant?.stock!;
      const newStock = stock + quantity;
      await updateStockPerVariantMutation.mutateAsync({
        newStock: newStock,
        stockPerVariant: selectedVariant.stock_per_variant!,
      });
    });
  });
}

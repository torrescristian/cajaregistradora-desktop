import { IStockPerVariant } from '@/interfaces/IProduct';
import strapi from '@/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductsQueryKey } from './useProductsQuery';
import IStockPerProduct from '@/interfaces/IStockPerProduct';

export interface IUpdateStockProductMutation {
  stock: number;
  stock_per_product: IStockPerProduct;
}

export default function useUpdateStockProductMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ stock, stock_per_product }: IUpdateStockProductMutation) => {
      const newStockPerProduct: Pick<IStockPerProduct, 'stock'> = {
        stock,
      };

      const res = await strapi.update(
        'stock-per-products',
        stock_per_product.id,
        newStockPerProduct,
      );

      console.log('Response:', res);
      await queryClient.invalidateQueries([getProductsQueryKey()]);

      return res;
    },
  );
}

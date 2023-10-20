import { IVariantPayload } from '@/interfaces/IVariants';
import { IStrapiSingleResponse } from '@/interfaces/utils';
import strapi from '@/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface IUseCreateVariantMutationProps {
  name: string;
  price: number;
  product: number;
  stock: number;
  isDefaultVariant: boolean;
  minimum_stock: number;
}
export const getVariantsQueryKey = () => 'variants'
export const getStockPerVariantsKey = () => 'stock-per-variants';

export default function useCreateVariantMutation() {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      name,
      price,
      product,
      stock,
      isDefaultVariant,
      minimum_stock,
    }: IUseCreateVariantMutationProps) => {
      const stockPerVariant = await strapi.create<{ id: number }>(
        getStockPerVariantsKey(),
        {
          stock,
        },
      );

      const newVariant: IVariantPayload = {
        price: price,
        name: name,
        product,
        stock_per_variant: stockPerVariant.data.id,
        minimum_stock: minimum_stock,
      };

      const res = (await strapi.create(
        getVariantsQueryKey(),
        newVariant,
      )) as IStrapiSingleResponse<IVariantPayload>;
      if (isDefaultVariant) {
        await strapi.update('products', product, {
          default_variant: res.data.id,
        });
      }
      queryClient.invalidateQueries([getStockPerVariantsKey()]);
      return res;
    },
  );
}

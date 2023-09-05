import { IVariantPayload } from '@/interfaces/IProduct';
import { ISingleFixedNativeResponse } from '@/interfaces/utils';
import strapi from '@/libs/strapi';
import { useMutation } from '@tanstack/react-query';

export interface IUseCreateVariantMutationProps {
  name: string;
  price: number;
  product: number;
  stock: number;
  isDefaultVariant: boolean;
}

export default function useCreateVariantMutation() {
  return useMutation(
    async ({
      name,
      price,
      product,
      stock,
      isDefaultVariant,
    }: IUseCreateVariantMutationProps) => {
      const stockPerVariant = await strapi.create<{ id: number }>(
        'stock-per-variants',
        {
          stock,
        },
      );

      const newVariant: IVariantPayload = {
        price: price,
        name: name,
        product,
        stock_per_variant: stockPerVariant.data.id,
      };

      const res = (await strapi.create(
        'variants',
        newVariant,
      )) as ISingleFixedNativeResponse<IVariantPayload>;
      if (isDefaultVariant) {
        await strapi.update('products', product, {
          default_variant: res.data.id,
        });
      }
      return res;
    },
  );
}

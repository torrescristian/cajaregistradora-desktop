import { IProductPayload, IVariantPayload } from '@/interfaces/IProduct';
import { ISingleFixedNativeResponse } from '@/interfaces/utils';
import strapi from '@/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductsQueryKey } from './useProductsQuery';
import useCreateVariantMutation from './useCreateVariantMutation';
import { use } from 'react';

interface IProps {
  data: IProductPayload;
  variants: IVariantPayload[];
  defaultVariantIndex: number;
}

export default function useCreateProductAndVariantMutation() {
  const queryClient = useQueryClient();
  const createVariantMutation = useCreateVariantMutation();
  return useMutation(
    async ({ data, variants, defaultVariantIndex }: IProps) => {
      const res = (await strapi.create(
        getProductsQueryKey(),
        data,
      )) as ISingleFixedNativeResponse<IProductPayload>;

      const validVariants = variants.filter((v) => v.name.trim());

      for (const index in validVariants) {
        const variant = variants[index];

        createVariantMutation.mutate({
          ...variant,
          product: res.data.id!,
          name: variant.name,
          price: variant.price,
          stock: variant.stock_per_variant,
          isDefaultVariant: Number(index) === defaultVariantIndex,
        });
      }
      queryClient.invalidateQueries([getProductsQueryKey()]);
      return res;
    },
  );
}

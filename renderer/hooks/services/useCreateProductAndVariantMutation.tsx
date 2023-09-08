import { IProductPayload, IVariantPayload } from '@/interfaces/IProduct';
import { ISingleFixedNativeResponse } from '@/interfaces/utils';
import strapi from '@/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductsQueryKey } from './useProductsQuery';
import useCreateVariantMutation from './useCreateVariantMutation';


interface IProps {
  data: IProductPayload;
  variants: IVariantPayload[];
  defaultVariantIndex: number;
}

export default function useCreateProductAndVariantMutation() {
  const createVariantMutation = useCreateVariantMutation();
  return useMutation(
    async ({ data, variants, defaultVariantIndex }: IProps) => {
      const res = (await strapi.create(
        getProductsQueryKey(),
        data,
      )) as ISingleFixedNativeResponse<IProductPayload>;
      console.log(
        '🚀 ~ file: useCreateProductMutation.tsx:8 ~ returnuseMutation ~ res:',
        res,
      );
      for (const index in variants) {
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
      return res;
    },
  );
}

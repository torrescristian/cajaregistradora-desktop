import { IProductPayload } from '@/modules/products/interfaces/IProduct';
import { IStrapiSingleResponse } from '@/modules/common/interfaces/utils';
import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useCreateVariantMutation from './useCreateVariantMutation';
import { IVariantPayload } from '@/modules/common/interfaces/IVariants';
import { PRODUCTS_KEY } from '@/modules/common/consts';

interface IProps {
  data: IProductPayload;
  variants: IVariantPayload[];
  defaultVariantIndex: number;
  minimum_stock?: number;
}

export default function useCreateProductAndVariantMutation() {
  const queryClient = useQueryClient();
  const createVariantMutation = useCreateVariantMutation();
  return useMutation(
    async ({ data, variants, defaultVariantIndex, minimum_stock }: IProps) => {
      const res = (await strapi.create(
        PRODUCTS_KEY,
        data,
      )) as IStrapiSingleResponse<IProductPayload>;

      const validVariants = variants.filter((v) => v.name.trim());

      for (const index in validVariants) {
        const variant = variants[index];

        createVariantMutation.mutate({
          ...variant,
          product: res.data.id!,
          name: variant.name,
          price: variant.price,
          stock: variant.stock_per_variant!,
          isDefaultVariant: Number(index) === defaultVariantIndex,
          minimum_stock: variant.minimum_stock!,
        });
      }
      queryClient.invalidateQueries([PRODUCTS_KEY]);
      return res;
    },
  );
}

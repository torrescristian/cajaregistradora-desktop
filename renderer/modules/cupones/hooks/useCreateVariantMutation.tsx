import { IVariantPayload } from '@/modules/common/interfaces/IVariants';
import { IStrapiSingleResponse } from '@/modules/common/interfaces/utils';
import { STOCK_PER_VARIANTS_KEY, VARIANTS_KEY } from '@/modules/common/consts';
import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export interface IUseCreateVariantMutationProps {
  name: string;
  price: number;
  product: number;
  stock?: number;
  isDefaultVariant?: boolean;
  minimum_stock?: number;
}

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
      try {
        const stockPerVariant = await strapi.create<{ id: number }>(
          STOCK_PER_VARIANTS_KEY,
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
          VARIANTS_KEY,
          newVariant,
        )) as IStrapiSingleResponse<IVariantPayload>;
        if (isDefaultVariant) {
          await strapi.update('products', product, {
            default_variant: res.data.id,
          });
        }
        queryClient.invalidateQueries([STOCK_PER_VARIANTS_KEY]);
        return res;
      } catch (e) {
        toast.error('Error al crear la variante');
      }
    },
  );
}

import strapi from '@/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductsQueryKey } from './useProductsQuery';
import { toast } from 'react-toastify';
import { IVariant } from '@/interfaces/IVariants';
import { getVariantsQueryKey } from './useCreateVariantMutation';

export interface IProps {
  newPrice: number;
  variant: Pick<IVariant, 'price' | 'id'>;
}

export default function useUpdateVariantPriceMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ newPrice, variant }: IProps) => {

        if (newPrice < 0) {
        toast.error('El precio no puede ser negativo');
        return [null];
      }

      if(variant.price === newPrice){
        return [null];
      }

      if (Number.isNaN(newPrice)){
        toast.error('El precio debe ser un valor numérico');
        return [null];
      }
      
      const res = await strapi.update(
        getVariantsQueryKey(),
        variant.id!,
        {
          price: newPrice,
        },
      );
      console.log(res);

      await queryClient.invalidateQueries([getProductsQueryKey()]);
      toast.success('Precio actualizado correctamente');
      return [res];
    },
  );
}

import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { IVariant } from '@/modules/common/interfaces/IVariants';
import { PRODUCTS_KEY, VARIANTS_KEY } from '@/modules/common/consts';

export interface IProps {
  newPrice: number;
  variant: Pick<IVariant, 'price' | 'id' | 'name'>;
}

export default function useUpdateVariantPriceMutation() {
  const queryClient = useQueryClient();

  return useMutation(async ({ newPrice, variant }: IProps) => {
    if (newPrice < 0) {
      toast.error('El precio no puede ser negativo');
      return [null];
    }

    if (variant.price === newPrice) {
      return [null];
    }

    if (Number.isNaN(newPrice)) {
      toast.error('El precio debe ser un valor numérico');
      return [null];
    }

    const res = await strapi.update(VARIANTS_KEY, variant.id!, {
      price: newPrice,
    });
    toast.success(`Precio de ${variant.name} actualizado correctamente`);
    await queryClient.invalidateQueries([PRODUCTS_KEY]);
    await queryClient.invalidateQueries([VARIANTS_KEY]);
    return res;
  });
}

import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  IProduct,
  PRODUCT_STATUS,
} from '@/modules/products/interfaces/IProduct';
import { toast } from 'react-toastify';
import { PRODUCTS_KEY, VARIANTS_KEY } from '@/modules/common/consts';
import {
  IVariant,
  IVariantExpanded,
  STATUS_VARIANTS,
} from '@/modules/common/interfaces/IVariants';
import useCancelProductMutation from './useCancelProductMutation';

interface IProps {
  variant: IVariantExpanded;
}

export default function useCancelVariantMutation() {
  const queryClient = useQueryClient();
  const cancelProduct = useCancelProductMutation();
  return useMutation(async ({ variant }: IProps) => {
    try {
      const res = await strapi.update(VARIANTS_KEY, variant.id!, {
        status: STATUS_VARIANTS.DISABLED,
      });
      toast.info('Variante eliminada');
      queryClient.invalidateQueries([VARIANTS_KEY]);

      const respProduct = (await strapi.findOne(
        PRODUCTS_KEY,
        variant.product.id!,
        {
          populate: [
            'variants',
            'variants.categories',
            'variants.stock_per_variant',
            'image',
            'default_variant',
            'default_variant.stock_per_variant',
            'type',
            'promo',
          ],
        },
      )) as unknown as IProduct;
      console.log({ respProduct });
      const variantsDisabled = respProduct.variants.every(
        (v) => v.status === STATUS_VARIANTS.DISABLED,
      );
      console.log({ variantsDisabled });
      if (variantsDisabled) {
        await cancelProduct.mutateAsync(variant.product.id!);
        toast.error('El producto se quedo sin Variantes, Fue eliminado');
        queryClient.invalidateQueries([PRODUCTS_KEY]);
      }
      return res;
    } catch (error) {
      toast.error(`Error al eliminar la variante con código ${variant.name}`);
    }
  });
}

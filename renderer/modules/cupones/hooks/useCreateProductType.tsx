import { IProductType } from '@/modules/products/interfaces/IProduct';
import strapi from '@/modules/common/libs/strapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PRODUCT_TYPE_KEY } from '@/modules/common/consts';


export default function useCreateProductType() {
  const queryClient = useQueryClient();
  return useMutation(async (productType: IProductType) => {
    const resp = await strapi.create(PRODUCT_TYPE_KEY, productType);
    queryClient.invalidateQueries([PRODUCT_TYPE_KEY]);
    return resp as unknown as IProductType;
  });
}

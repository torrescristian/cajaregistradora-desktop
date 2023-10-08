import { IProductPayload } from '@/interfaces/IProduct';
import { IStrapiSingleResponse } from '@/interfaces/utils';
import strapi from '@/libs/strapi';
import { useMutation } from '@tanstack/react-query';

export default function useCreateProductMutation() {
  return useMutation(async (data: IProductPayload) => {
    const res = await strapi.create('products', data);
    console.log(
      '🚀 ~ file: useCreateProductMutation.tsx:8 ~ returnuseMutation ~ res:',
      res,
    );
    console.log(res);
    return res as IStrapiSingleResponse<IProductPayload>;
  });
}

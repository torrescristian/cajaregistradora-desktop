import { IProduct } from '@/interfaces/IProduct';
import strapi from '@/libs/strapi';
import { useMutation } from 'react-query';

export default function useCreateProductMutation() {
  return useMutation(async (data: IProduct) => {
     const res = await strapi.create('products', data);
    console.log(
       '🚀 ~ file: useCreateProductMutation.tsx:8 ~ returnuseMutation ~ res:',
      res
    );

    return res;
  });
}

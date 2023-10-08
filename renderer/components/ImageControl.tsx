import useUpdateProductMutation from '@/hooks/services/useUpdateProductMutation';
import { IProduct } from '@/interfaces/IProduct';
import strapi from '@/libs/strapi';
import React from 'react';
import Loader from './Loader';

interface IProps {
  product?: IProduct;
}

const ImageControl = ({ product }: IProps) => {
  const updateProductMutation = useUpdateProductMutation();

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    const [productImage] = await fetch(
      'https://control.cajaregistradora.app/api/upload',
      {
        method: 'POST',
        body: new FormData(e.target),
        headers: {
          Authorization: 'Bearer ' + strapi.getToken(),
          'Access-Control-Allow-Origin':
            'https://control.cajaregistradora.app/',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        },
      },
    ).then((res) => res.json());
    updateProductMutation.mutate({
      id: product?.id!,
      image: productImage,
    });
  };

  return (
    <form onSubmit={handleSubmitForm} className="flex flex-col items-center">
      <img src={product?.image || 'default.png'} alt="" className="w-max" />
      {updateProductMutation.isLoading ? (
        <Loader />
      ) : (
        <>
          <input
            type="file"
            name="files"
            className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
          />
          <button type="submit" className="btn btn-success w-min">
            Guardar foto
          </button>
        </>
      )}
    </form>
  );
};

export default ImageControl;

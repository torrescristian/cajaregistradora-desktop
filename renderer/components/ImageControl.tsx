import useUpdateProductMutation from '@/hooks/services/useUpdateProductMutation';
import { IProduct } from '@/interfaces/IProduct';
import strapi from '@/libs/strapi';
import React from 'react';
import Loader from './Loader';
import { getStrapiUrl } from '../../main/helpers/utils';

interface IProps {
  product?: IProduct;
}

const ImageControl = ({ product }: IProps) => {
  const updateProductMutation = useUpdateProductMutation();

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    const [productImage] = await fetch(getStrapiUrl(), {
      method: 'POST',
      body: new FormData(e.target),
      headers: {
        Authorization: 'Bearer ' + strapi.getToken(),
        'Access-Control-Allow-Origin': getStrapiUrl(),
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
      },
    }).then((res) => res.json());
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

import useUpdateProductMutation from '@/modules/reabastecer/hooks/useUpdateProductMutation';
import { IProduct } from '@/modules/products/interfaces/IProduct';
import strapi from '@/modules/common/libs/strapi';
import React from 'react';
import Loader from '@/modules/common/components/atoms/Loader';
import { getStrapiUrl, getUrlFromImage } from '@/modules/common/libs/utils';

interface IProps {
  product?: IProduct;
}

const ImageControl = ({ product }: IProps) => {
  const updateProductMutation = useUpdateProductMutation();

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    const [productImage] = await fetch(`${getStrapiUrl()}/api/upload`, {
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
      <img src={getUrlFromImage(product?.image)} alt="" className="w-min" />
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

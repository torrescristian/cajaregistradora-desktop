import IProductUI from '@/interfaces/IProduct';
import strapi from '@/libs/strapi';
import React, { useEffect, useState } from 'react';

interface IProps {
  product?: IProductUI;
  onChange: (imageName: string) => void;
}

const ImageControl = ({ product, onChange }: IProps) => {
  const [imageName, setImageName] = useState(product?.image || '');

  useEffect(() => {
    onChange(imageName);
  }, [imageName]);

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
    setImageName(productImage);
  };

  return (
    <form onSubmit={handleSubmitForm} className="flex flex-col items-center">
      <img src={imageName} alt="imagen" className="w-max rounded-lg" />
      <input
        type="file"
        name="files"
        className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
      />
      <button type="submit" className="btn btn-success w-min">
        Guardar foto
      </button>
    </form>
  );
};

export default ImageControl;

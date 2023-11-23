import strapi from '@/modules/common/libs/strapi';
import { getStrapiUrl } from '@/modules/common/libs/utils';

export const useImageControl = () => {
  const processSubmit = async (e: any) => {
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

    return productImage;
  };

  return { processSubmit };
};

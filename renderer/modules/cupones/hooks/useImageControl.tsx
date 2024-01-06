import strapi from '@/modules/common/libs/strapi';
import { getStrapiUrl } from '@/modules/common/libs/utils';

export const useImageControl = () => {
  const processSubmit = async (e: any) => {
    e.preventDefault();
    const valueFile = e.target;

    if (valueFile === undefined || null) {
      return 'default.png';
    }

    if (valueFile !== undefined || null) {
      const formData = new FormData(e.target);
      const productImage = await fetch(`${getStrapiUrl()}/api/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + strapi.getToken(),
          'Access-Control-Allow-Origin': getStrapiUrl(),
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        },
      }).then((res) => res.json());

      return productImage;
    }
  };

  return { processSubmit };
};

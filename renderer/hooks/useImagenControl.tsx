import strapi from '@/libs/strapi';
import { getStrapiUrl } from '@/libs/utils';

export default function useImageControl() {
  async function loadImageAndGetUrlFromEvent(e: any) {
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
  }
  return { loadImageAndGetUrlFromEvent };
}

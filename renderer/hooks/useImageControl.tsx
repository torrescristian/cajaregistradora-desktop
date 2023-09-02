import strapi from "@/libs/strapi";

export const useImageControl = () => {
    const processSubmit = async (e: any) => {
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
      
      return productImage;
    };
  
    return { processSubmit }
  }
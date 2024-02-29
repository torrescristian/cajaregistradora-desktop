import strapi from '@/modules/common/libs/strapi';
import { getStrapiUrl } from '@/modules/common/libs/utils';

export const useImageControl = () => {
  const processSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const imageFile = formData.get('files');

    // Verificar si se proporcionó un archivo de imagen
    if (!imageFile || (imageFile instanceof File && imageFile.size === 0)) {
      // No se proporcionó una imagen o el tamaño del archivo es cero, retornar un valor por defecto
      return undefined;
    }

    try {
      // Se proporcionó una imagen, enviar el formulario con la imagen
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
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
      return null; // Retornar null en caso de error
    }
  };

  return { processSubmit };
};

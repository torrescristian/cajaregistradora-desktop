import strapi from '@/modules/common/libs/strapi';
import { getStrapiUrl } from '@/modules/common/libs/utils';

export const useImageControl = () => {
  const processSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const imageFile = formData.get('files');

    // Verificar si se proporcionó un archivo de imagen
    if (imageFile instanceof File || (typeof imageFile === 'string' && imageFile.length > 0)) {
      try {
        const response = await fetch(`${getStrapiUrl()}/api/upload`, {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: 'Bearer ' + strapi.getToken(),
            'Access-Control-Allow-Origin': getStrapiUrl(),
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Authorization, Content-Type',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al cargar la imagen');
        }

        const productImage = await response.json();
        return productImage;
      } catch (error) {
        console.error('Error al cargar la imagen:', error);
        return null;
      }
    } else {
      // Eliminar el campo de imagen del formData
      formData.delete('files');

      try {
        const response = await fetch(`${getStrapiUrl()}/api/submit-form-without-image`, {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: 'Bearer ' + strapi.getToken(),
            'Access-Control-Allow-Origin': getStrapiUrl(),
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Authorization, Content-Type',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al enviar el formulario sin imagen');
        }

        return null;
      } catch (error) {
        console.error('Error al enviar el formulario sin imagen:', error);
        return null;
      }
    }
  };

  return { processSubmit };
};

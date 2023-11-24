import { Divider } from '@/modules/cart/components/Sale/Sale.styles';
import Footer from '@/modules/common/components/Footer';
import WhatsappButton from '@/modules/common/components/WhatsappButton';
import { IComponent } from '@/modules/common/interfaces/ProductItem.interfaces';
import { useRouter } from 'next/router';
import React from 'react';

const Subtitle = ({ children }: IComponent) => (
  <>
    <Divider />
    <h2 className="font-bold text-lg mb-2">{children}</h2>
  </>
);
const Parragraph = ({ children }: IComponent) => (
  <p className="text-sm">{children}</p>
);

const CajaRegistradoraApp: React.FC = () => {
  const router = useRouter();

  return (
    <section className="flex flex-col gap-5 justify-center items-center">
      <div className="w-full flex flex-col items-end gap-3">
        <h1 className="text-lg">Caja Registradora</h1>
        <span className="italic">Tu aliado en las ventas</span>
        <button
          className="btn btn-primary"
          onClick={() => router.push('/login')}
        >
          Iniciar Sesión
        </button>
      </div>
      <div>
        <Subtitle>
          📱 🖥️ Pedidos Rápidos desde Tu Teléfono o Computadora:
        </Subtitle>
        <Parragraph>
          Realiza pedidos en segundos. Selecciona, ajusta y revisa fácilmente.
        </Parragraph>
      </div>

      <div>
        <Subtitle>🔄 Actualizaciones de Precios en Lote:</Subtitle>
        <Parragraph>
          Mantén tus precios actualizados con facilidad. Incrementos fijos o
          porcentajes.
        </Parragraph>
      </div>

      <div>
        <Subtitle>🎟️ Impresión de Tickets:</Subtitle>
        <Parragraph>
          Genera tickets fácilmente: cliente, comanda y precio final.
        </Parragraph>
      </div>

      <div>
        <Subtitle>🎨 Adaptación a Tu Medida:</Subtitle>
        <Parragraph>
          Personalización exclusiva. Tu experiencia con CajaRegistradora.app es
          única.
        </Parragraph>
      </div>

      <div>
        <Subtitle>🤝 Soporte Disponible:</Subtitle>
        <Parragraph>
          Equipo de soporte de 9 a 12hs y de 15 a 19hs. ¿Necesitas ayuda o
          capacitación?
        </Parragraph>
      </div>

      {/* <div>
        <Subtitle>🌟 Descubre CajaRegistradora.app hoy mismo.</Subtitle>
        <div
          className="btn btn-primary"
          onClick={() => window.open('URL_REAL_DE_TU_PAGINA_DE_DEMOSTRACION')}
        >
          Probar ahora
        </div>
        <p>
          Utiliza el usuario de prueba "lacocina@gmail.com" con la contraseña
          "lacocina123" y experimenta todas las funcionalidades de
          CajaRegistradora.app.
        </p>
      </div> */}
      <WhatsappButton className="fixed bottom-12 w-fit" />
      <div className="p-10" />
      <Footer />
    </section>
  );
};

export default CajaRegistradoraApp;

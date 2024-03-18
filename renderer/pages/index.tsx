import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import Footer from '@/modules/common/components/molecules/Footer';
import WhatsappButton from '@/modules/common/components/atoms/WhatsappButton';
import { Divider } from '@/modules/common/components/atoms/Divider';
import { IComponent } from '@/modules/common/interfaces/IComponent';
import { useAuthState } from '@/modules/common/contexts/AuthContext';
import { LOGIN_URL, ORDENES_URL } from '@/modules/common/consts';

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

  const { isLoggedIn } = useAuthState();

  useEffect(() => {
    if (isLoggedIn) {
      router.push(ORDENES_URL);
    }
  }, [isLoggedIn]);

  return (
    <section className="flex flex-col gap-5 justify-center items-start px-[20vw]">
      <div className="w-full flex flex-col items-end gap-3">
        <h1 className="text-lg">Caja Registradora</h1>
        <span className="italic">Tu aliado en las ventas</span>
        <button
          className="btn btn-primary"
          onClick={() => router.push(LOGIN_URL)}
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
          Personalización exclusiva. Tu experiencia con CajaRegistradora.com.ar
          es única.
        </Parragraph>
      </div>

      <div>
        <Subtitle>🤝 Soporte Disponible:</Subtitle>
        <Parragraph>
          Equipo de soporte de 9 a 12hs y de 15 a 19hs. ¿Necesitas ayuda o
          capacitación?
        </Parragraph>
      </div>

      <WhatsappButton className="fixed bottom-12 w-fit" />
      <div className="p-10" />
      <Footer />
    </section>
  );
};

export default CajaRegistradoraApp;

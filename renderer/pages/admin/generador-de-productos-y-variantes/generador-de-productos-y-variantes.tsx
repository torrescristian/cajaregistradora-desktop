import CreateVariant from '@/components/CreateVariant';
import CrearProducto from '@/components/crear-producto';
import { useState } from 'react';

export default function GeneradorDeProductosYVariantes() {
  const [show, setShow] = useState(false);

  const handleChangeBox = () => {
    setShow((s) => !s);
  };

  return (
    <section className="flex w-full flex-row justify-evenly">
      <CrearProducto
        className="w-max flex gap-10 flex-row"
        handleChangeBox={handleChangeBox}
        show={show}
      />
      {show && <CreateVariant />}
    </section>
  );
}

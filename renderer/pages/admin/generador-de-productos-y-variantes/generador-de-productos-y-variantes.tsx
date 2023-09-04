import CreateVariant from '@/components/CreateVariant';
import CrearProducto from '@/components/CreateProduct';
import { useState } from 'react';
import ProductControl from '@/components/ProductControl';

export default function GeneradorDeProductosYVariantes() {
  const [show, setShow] = useState(false);

  const handleChangeBox = () => {
    setShow((s) => !s);
  };

  return (
    <section className="flex w-full flex-row justify-evenly">
      <ProductControl controlType={'CREATE'} />
      {show && <CreateVariant />}
    </section>
  );
}

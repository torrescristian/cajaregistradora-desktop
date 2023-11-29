import ProductControlMobile from '../common/components/Mobile/ProductControlMobile';
import useIsMobile from '../reabastecer/hooks/useIsMobile';
import ProductControl from './components/ProductControl';

export default function CrearProductosPage() {
  const isMobile = useIsMobile();
  return (
    <section className="flex w-full sm:mt-2 mt-40 sm:flex-row sm:justify-evenly">
      {isMobile ? (
        <ProductControlMobile controlType={'CREATE'} />
      ) : (
        <ProductControl controlType={'CREATE'} />
      )}
    </section>
  );
}

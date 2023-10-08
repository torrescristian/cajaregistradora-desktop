import ProductControl from '@/components/ProductControl';

export default function GeneradorDeProductosYVariantes() {
  return (
    <section className="flex w-full flex-row justify-evenly">
      <ProductControl controlType={'CREATE'} />
    </section>
  );
}

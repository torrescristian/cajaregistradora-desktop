import Loader from '@/modules/common/components/Loader';
import { useProductsProps } from '../hooks/useProductsProps';
import SearchInput from '@/modules/common/components/SearchInput';
import { ProductItemMobile } from './ProductItemMobile';
import { CartIconMobile } from '@/modules/common/components/Mobile/CartIconMobile';
import ProductTypes from './ProductTypes';

export const ProductsMobile = () => {
  const {
    promos,
    handleClickPage,
    handleSelectPage,
    products,
    showPromo,
    productsQuery,
    promoQuery,
    searchProps,
    selectedProductType,
    setShowPromo,
  } = useProductsProps();

  if (promoQuery.isLoading) {
    return <Loader />;
  }
  return (
    <section className="w-full flex flex-col">
      <div className="flex flex-row items-center justify-between p-3 gap-5">
        <ProductTypes
          setShowPromo={setShowPromo}
          showPromo={showPromo}
          onSelect={handleSelectPage}
          selectedProductType={selectedProductType?.id!}
        />
        <SearchInput {...searchProps} />
        <CartIconMobile />
      </div>
      {products.map((product) => (
        <ProductItemMobile key={product.id} product={product} />
      ))}
    </section>
  );
};

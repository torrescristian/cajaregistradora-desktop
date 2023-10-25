import ProductItem from '@/components/ProductItem';
import { IComponent } from '@/interfaces/ProductItem.interfaces';
import SearchInput, { useSearchProps } from '@/components/SearchInput';
import useProductsQuery from '@/hooks/services/useProductsQuery';
import { IProduct, IProductType } from '@/interfaces/IProduct';
import Loader from '@/components/Loader';
import ProductTypes from './ProductTypes';
import { useState } from 'react';
import { RenderIf } from './RenderIf';
import RenderPromos from './Promo/RenderPromo';
import usePromoQuery from '@/hooks/services/usePromoQuery';
import Pagination from './VariantUpdateTable/subcomponents/Pagination';
import { IPromoExpanded } from '@/interfaces/IPromo';

const Navigation = ({ children }: IComponent) => (
  <section className="flex w-full justify-center items-center flex-row gap-5">
    {children}
  </section>
);

const Products = () => {
  const searchProps = useSearchProps();

  const [showPromo, setShowPromo] = useState(false);
  const promoQuery = usePromoQuery();
  const promos = promoQuery.data;
  const [activePage, setActivePage] = useState(1);

  const [promosSelected, setPromosSelected] = useState<IPromoExpanded[] | null>(
    [],
  );
  const [selectedProductType, setSelectedProductType] =
    useState<IProductType | null>();

  const handleClickPage = (page: number) => () => setActivePage(page);
  const productsQuery = useProductsQuery({
    query: searchProps.query,
    selectedProductType: selectedProductType?.id,
    promo: promosSelected?.map((promo) => promo.id!),
    page: activePage,
  });

  const handleSelectPage = (type: IProductType | null) => {
    setSelectedProductType(type);
    setActivePage(1);
  };

  const products = productsQuery.products as IProduct[];

  if (promoQuery.isLoading) {
    return <Loader />;
  }

  return (
    <section className="w-full">
      <Navigation>
        <SearchInput {...searchProps} />
        <ProductTypes
          setShowPromo={setShowPromo}
          showPromo={showPromo}
          onSelect={handleSelectPage}
          selectedProductType={selectedProductType?.id!}
        />
      </Navigation>
      <section className="flex flex-row gap-5 m-5 p-2 overflow-x-scroll w-full">
        {productsQuery.isLoading && <Loader />}
        {productsQuery.isError && <p>Error</p>}
        <RenderIf condition={!showPromo}>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </RenderIf>
        <RenderIf condition={showPromo}>
          <RenderPromos
            promosItems={promos!.map((promo) => ({
              promo,
              selectedVariants: [],
            }))}
            salesMode
          />
        </RenderIf>
      </section>
      <Pagination
        pagination={productsQuery.pagination}
        onClick={handleClickPage}
        isLoading={productsQuery.isLoading}
      />
    </section>
  );
};

export default Products;

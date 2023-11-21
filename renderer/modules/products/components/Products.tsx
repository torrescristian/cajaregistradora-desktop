import ProductItem from '@/modules/products/components/ProductItem';
import { IComponent } from '@/modules/common/interfaces/ProductItem.interfaces';
import SearchInput, {
  useSearchProps,
} from '@/modules/common/components/SearchInput';
import useProductsQuery from '@/modules/products/hooks/useProductsQuery';
import { IProduct, IProductType } from '@/modules/products/interfaces/IProduct';
import Loader from '@/modules/common/components/Loader';
import ProductTypes from './ProductTypes';
import { useState } from 'react';
import { RenderIf } from '@/modules/common/components/RenderIf';
import RenderPromos from '@/modules/promos/components/RenderPromo';
import usePromoQuery from '@/modules/promos/hooks/usePromoQuery';
import Pagination from '@/modules/common/components/Pagination';

const Navigation = ({ children }: IComponent) => (
  <section className="flex w-full justify-center items-center flex-col sm:flex-row gap-5">
    {children}
  </section>
);

const Products = () => {
  const searchProps = useSearchProps();

  const [showPromo, setShowPromo] = useState(false);
  const [promosSelectedPage, setPromosSelectedPage] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [selectedProductType, setSelectedProductType] =
    useState<IProductType | null>();

  const promoQuery = usePromoQuery({
    query: searchProps.query,
    showPromo,
    page: promosSelectedPage,
  });
  const promos = promoQuery.data;

  const productsQuery = useProductsQuery({
    query: searchProps.query,
    selectedProductType: selectedProductType?.id,
    page: activePage,
    showPromo,
  });

  const products = productsQuery.products as IProduct[];

  const handleClickPage = (page: number) => () => setActivePage(page);
  const handleSelectPage = (type: IProductType | null) => {
    setSelectedProductType(type);
    setActivePage(1);
  };

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

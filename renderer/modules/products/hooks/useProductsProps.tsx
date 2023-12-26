import { useSearchProps } from '@/modules/common/components/SearchInput';
import { useState } from 'react';
import { IProduct, IProductType } from '../interfaces/IProduct';
import usePromoQuery from '@/modules/promos/hooks/usePromoQuery';
import useProductsQuery from './useProductsQuery';
import {
  getPromoItems,
  useCartStore,
} from '@/modules/cart/contexts/useCartStore';
import { useButtonPagination } from '@/modules/reabastecer/components/ButtonPagination';

export const useProductsProps = () => {
  const searchProps = useSearchProps();
  const paginationControls = useButtonPagination();

  const [showPromo, setShowPromo] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [selectedProductType, setSelectedProductType] =
    useState<IProductType | null>(null);
  const promoItems = useCartStore(getPromoItems);
  const promoQuery = usePromoQuery({
    query: searchProps.query,
    showPromo,
    page: activePage,
  });
  const promos = promoQuery.data;

  const productsQuery = useProductsQuery({
    query: searchProps.query,
    selectedProductType: selectedProductType?.id,
    page: paginationControls.page,
    showPromo,
    setTotalPages: paginationControls.setTotalPages,
  });

  const products = productsQuery.products as IProduct[];
  const totalPages = productsQuery.pagination;

  const handleNextPage = (page: number) => () => setActivePage(page);
  const handleSelectPage = (type: IProductType | null) => {
    setSelectedProductType(type);
    setActivePage(1);
  };

  return {
    products,
    handleNextPage,
    handleSelectPage,
    promos,
    showPromo,
    productsQuery,
    promoQuery,
    searchProps,
    setShowPromo,
    selectedProductType,
    promoItems,
    totalPages,
    paginationControls,
  };
};

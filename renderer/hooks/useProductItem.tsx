import {
  getCartItemQuantityByProductId,
  useCartStore,
} from '@/contexts/CartStore';
import { IProduct } from '@/interfaces/IProduct';

const useProductItem = (product: IProduct) => {
  const isNotService = !product.isService;
  const disabled = isNotService;
  const isService = !!product.isService;
  const {
    cartItemQuantity,
    addProduct,
    updatePrice,
    removeCartItem,
    removeProduct,
  } = useCartStore((state) => ({
    addProduct: state.addProduct,
    updatePrice: state.updatePrice,
    removeCartItem: state.removeCartItem,
    removeProduct: state.removeProduct,
    cartItemQuantity: getCartItemQuantityByProductId(product.id!)(state),
  }));

  const handleClickAdd = () => {
    addProduct(product);
  };

  const handleClickRemove = () => {
    removeProduct(product);
  };

  const handleClickClear = () => {
    removeCartItem(product);
  };

  const handleClickSelectUpdatePrice = async (newPrice: number) => {
    updatePrice({ product, newPrice });
  };

  return {
    disabled,
    cartItemQuantity,
    handleClickAdd,
    handleClickRemove,
    handleClickClear,
    isService,
    handleClickSelectUpdatePrice,
  };
};

export default useProductItem;

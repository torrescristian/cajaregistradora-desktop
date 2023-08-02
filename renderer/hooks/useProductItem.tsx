import {
  addProduct,
  updatePrice,
  getCartItemQuantityByProductId,
  removeCartItem,
  removeProduct,
  useCartDispatch,
  useCartSelect,
} from '@/contexts/CartContext';
import IProductUI from '@/interfaces/IProduct';

const useProductItem = (product: IProductUI) => {
  const isNotService = !product.isService;
  const isDisabledOrWithoutStock = product?.disabled;
  const disabled = isNotService && isDisabledOrWithoutStock;
  const isService = !!product.isService;
  const cartItemQuantity = useCartSelect(
    getCartItemQuantityByProductId(product.id),
  );
  const dispatch = useCartDispatch();

  const handleClickAdd = () => {
    dispatch(addProduct(product));
  };

  const handleClickRemove = () => {
    dispatch(removeProduct(product));
  };

  const handleClickClear = () => {
    dispatch(removeCartItem(product));
  };

  const handleClickSelectUpdatePrice = async (newPrice: number) => {
    dispatch(updatePrice({ product, newPrice }));
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

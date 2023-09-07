import {
  getCartItemQuantityByVariantId as getCartItemQuantityByVariantId,
  useCartStore,
} from '@/contexts/CartStore';
import { IProduct, IVariant } from '@/interfaces/IProduct';

interface IProps {
  product: IProduct;
  selectedVariant: IVariant;
}

const useProductItem = ({ product, selectedVariant }: IProps) => {
  const isNotService = !product.isService;
  const disabled = isNotService;
  const isService = !!product.isService;
  const { cartItemQuantity, addProduct, removeCartItem, removeProduct } =
    useCartStore((state) => ({
      addProduct: state.addProduct,
      removeCartItem: state.removeCartItem,
      removeProduct: state.removeProduct,
      cartItemQuantity: getCartItemQuantityByVariantId(selectedVariant.id!)(
        state,
      ),
    }));

  const handleClickAdd = () => {
    addProduct({ product, selectedVariant });
  };

  const handleClickRemove = () => {
    removeProduct({ product, selectedVariant });
  };

  const handleClickClear = () => {
    removeCartItem({ product, selectedVariant });
  };

  return {
    disabled,
    cartItemQuantity,
    handleClickAdd,
    handleClickRemove,
    handleClickClear,
    isService,
  };
};

export default useProductItem;

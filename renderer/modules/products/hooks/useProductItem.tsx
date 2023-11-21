import {
  getCartItemQuantityByVariantId as getCartItemQuantityByVariantId,
  useCartStore,
} from '@/modules/cart/contexts/useCartStore';
import { IProduct } from '@/modules/products/interfaces/IProduct';
import { IVariant } from '@/modules/common/interfaces/IVariants';

interface IProps {
  product: IProduct;
  selectedVariant: IVariant;
}

const useProductItem = ({ product, selectedVariant }: IProps) => {
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
    cartItemQuantity,
    handleClickAdd,
    handleClickRemove,
    handleClickClear,
    isService,
  };
};

export default useProductItem;

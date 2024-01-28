import {
  getCartItemQuantityByVariantId as getCartItemQuantityByVariantId,
  useCartStore,
} from '@/modules/cart/contexts/useCartStore';
import { IProduct } from '@/modules/products/interfaces/IProduct';
import { IVariant, IVariantPromo } from '@/modules/common/interfaces/IVariants';
import { useState } from 'react';

interface IProps {
  product: IProduct;
  onClick?: (props: { product: IProduct; variant: IVariantPromo }) => void;
  selectedVariant?: IVariant;
}

const useProductItem = (props: IProps) => {
  const [selectedVariant, setSelectedVariant] = useState(
    props.selectedVariant || props.product?.default_variant,
  );

  const isService = !!props.product?.isService;
  const {
    cartItemQuantity,
    addProduct,
    removeCartItem,
    removeProduct,
    setProductQuantity,
  } = useCartStore((state) => ({
    addProduct: state.addProduct,
    removeCartItem: state.removeCartItem,
    removeProduct: state.removeProduct,
    cartItemQuantity: getCartItemQuantityByVariantId(selectedVariant?.id!)(
      state,
    ),
    setProductQuantity: state.setProductQuantity,
  }));

  const handleChangeVariant = (e: any) => {
    props.product?.variants.map((variant) => {
      if (variant.name === e.target.value) {
        setSelectedVariant(variant);
      }
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (props.onClick) {
      props.onClick({
        product: props.product,
        variant: {
          ...selectedVariant,
          product: props.product,
        },
      });
      return;
    }

    handleClickAdd();
  };

  const setItemQuantity = (quantity: number) => {
    setProductQuantity({ product: props.product, selectedVariant, quantity });
  };

  const handleClickAdd = () => {
    addProduct({ product: props.product, selectedVariant });
  };

  const handleClickRemove = () => {
    removeProduct({ product: props.product, selectedVariant });
  };

  const handleClickClear = () => {
    removeCartItem({ product: props.product, selectedVariant });
  };

  return {
    cartItemQuantity,
    setItemQuantity,
    handleClickAdd,
    handleClickRemove,
    handleClickClear,
    isService,
    selectedVariant,
    handleChangeVariant,
    handleClick,
  };
};

export default useProductItem;

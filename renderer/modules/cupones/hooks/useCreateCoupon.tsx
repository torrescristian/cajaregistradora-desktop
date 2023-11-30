import { useForm } from 'react-hook-form';
import { ICouponPayload } from '../interfaces/ICoupon';
import { useState } from 'react';
import { IProduct, IProductType } from '@/modules/products/interfaces/IProduct';
import { useSearchProps } from '@/modules/common/components/SearchInput';
import useProductsQuery from '@/modules/products/hooks/useProductsQuery';
import useCreateCouponMutation from './useCreateCouponMutation';
import { DISCOUNT_TYPE, IDiscount } from '@/modules/ordenes/interfaces/IOrder';
import { IVariantPromo } from '@/modules/common/interfaces/IVariants';
import { toast } from 'react-toastify';
import useCalcDiscountType from '@/modules/common/hooks/useCalcDiscountType';

export default function useCreateCoupon() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ICouponPayload>({
    defaultValues: {
      code: '',
      dueDate: '',
      maxAmount: 0,
      availableUses: 1,
    },
  });

  const [selectedProductType, setSelectedProductType] =
    useState<IProductType>();
  const searchProps = useSearchProps();
  const productsQuery = useProductsQuery({
    query: searchProps.query,
    selectedProductType: selectedProductType?.id,
  });

  const products = productsQuery.products as IProduct[];

  const createCouponMutation = useCreateCouponMutation();

  const { discountAmount, discountType, setDiscountAmount, setDiscountType } =
    useCalcDiscountType();

  const [selectedVariant, setSelectedVariant] = useState<IVariantPromo | null>({
    ...products[0]?.default_variant,
    product: products[0],
  });

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(
    products[0],
  );

  const [showProductList, setShowProductList] = useState(false);

  const handleClickAddProduct = (props: {
    product: IProduct;
    variant: IVariantPromo;
  }) => {
    setSelectedProduct(props.product);
    setSelectedVariant({
      ...props.variant,
      product: props.product,
    });
  };

  const handleSubmitCreateCoupon = async (data: ICouponPayload) => {
    try {
      await createCouponMutation.mutateAsync({
        ...data,
        variant: showProductList ? selectedVariant?.id! : null,
        discount: {
          amount: Number(discountAmount!),
          type: discountType!,
        },
        dueDate: data.dueDate || undefined,
      });
      toast.success('Cupón creado');
    } catch (error) {
      console.log({ error });
      toast.error('Error al crear el cupón');
    }
  };
  const handleClickRemoveProduct = () => {
    setSelectedProduct(null);
    setSelectedVariant(null);
  };
  const handleChangeDiscountType = (discount: IDiscount) => {
    setDiscountType(discount.type);
    setDiscountAmount(discount.amount);
  };
  const handleCheckProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowProductList(e.target.checked);
  };

  return {
    handleSubmit,
    handleSubmitCreateCoupon,
    register,
    errors,
    handleChangeDiscountType,
    discountAmount,
    discountType,
    showProductList,
    createCouponMutation,
    selectedProduct,
    handleClickRemoveProduct,
    selectedVariant,
    handleClickAddProduct,
    products,
    searchProps,
    handleCheckProduct,
    setDiscountAmount,
    setDiscountType,
  };
}

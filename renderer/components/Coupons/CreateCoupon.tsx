import { useForm } from 'react-hook-form';
import FormFieldText from '../FormFieldText';
import useCreateCouponMutation from '@/hooks/services/useCreateCouponMutation';
import { useState } from 'react';
import SearchInput, { useSearchProps } from '../SearchInput';
import { IProduct, IProductType} from '@/interfaces/IProduct';
import useProductsQuery from '@/hooks/services/useProductsQuery';
import ProductItem from '../ProductItem';
import { convertToEmoji } from '@/libs/utils';
import { MinusIcon } from '@heroicons/react/24/solid';
import { RenderIf } from '../RenderIf';
import { ICouponPayload } from '@/interfaces/ICoupon';
import { DiscountTypeControl } from '../DiscountTypeControl';
import { DISCOUNT_TYPE, IDiscount } from '@/interfaces/IOrder';
import { Card } from '../Card';
import { IVariantPromo } from '@/interfaces/IVariants';
import Loader from '../Loader';
import CustomToastContainer from '../CustomToastContainer';
import { toast } from 'react-toastify';

export const CreateCoupon = () => {
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

  const [discountType, setDiscountType] = useState<DISCOUNT_TYPE>();
  const [discountAmount, setDiscountAmount] = useState<number>();

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
          amount: discountAmount!,
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

  return (
    <Card>
      <CustomToastContainer />
      <form
        onSubmit={handleSubmit(handleSubmitCreateCoupon)}
        className="flex flex-col p-4 gap-10"
      >
        <div className="flex flex-row gap-10 w-full justify-between">
          <div className="flex flex-col gap-3">
            <FormFieldText
              register={register}
              errors={errors}
              formKey="code"
              label="Nombre del cupon:"
            />
            <label className="label">Fecha de expiracion:</label>
            <input
              type="date"
              {...register('dueDate')}
              className="w-full input-secondary"
            />
          </div>
          <div className="flex flex-col">
            <DiscountTypeControl
              onChange={handleChangeDiscountType}
              discountAmount={discountAmount}
              discountType={discountType}
            />
            <RenderIf condition={discountType === DISCOUNT_TYPE.PERC}>
              <FormFieldText
                register={register}
                errors={errors}
                formKey="maxAmount"
                label="Monto máximo:"
              />
            </RenderIf>
          </div>
          <div className="flex flex-col">
            <FormFieldText
              errors={errors}
              register={register}
              formKey="availableUses"
              label="Cantidad de usos:"
            />
          </div>
        </div>
        <label className="label w-fit gap-2">
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={showProductList}
            onChange={handleCheckProduct}
          />{' '}
          Agregar un producto
        </label>
        <div className="flex flex-col items-end gap-4">
          <RenderIf condition={showProductList}>
            <RenderIf condition={!selectedVariant}>
              <SearchInput {...searchProps} />
              <div className="flex flex-row overflow-x-scroll gap-5 p-5 w-[80vw]">
                {products.map((product) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    onClick={handleClickAddProduct}
                  />
                ))}
              </div>
            </RenderIf>
            <RenderIf condition={selectedVariant}>
              <div className="flex flex-col p-3 border-2 gap-5 items-center">
                <div className="flex flex-row gap-5 justify-between items-center">
                  <p className="font-bold">
                    {`${convertToEmoji(
                      selectedProduct?.type,
                    )} ${selectedProduct?.name} ${selectedVariant?.name}`}
                  </p>
                  <button
                    className="btn btn-error"
                    onClick={handleClickRemoveProduct}
                  >
                    <MinusIcon className="w-3 h-3" />
                  </button>
                </div>
                <img src={selectedProduct?.image} className="w-min" />
              </div>
            </RenderIf>
          </RenderIf>
          <button
            className="btn btn-square w-64 btn-primary"
            type="submit"
            disabled={createCouponMutation.isLoading}
          >
            {createCouponMutation.isLoading ? <Loader /> : 'Crear cupon'}
          </button>
        </div>
      </form>
    </Card>
  );
};

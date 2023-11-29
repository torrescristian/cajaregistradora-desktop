import FormFieldText from '@/modules/common/components/FormFieldText';
import SearchInput from '@/modules/common/components/SearchInput';
import ProductItem from '@/modules/products/components/ProductItem';
import { MinusIcon } from '@heroicons/react/24/solid';
import { RenderIf } from '@/modules/common/components/RenderIf';
import { DiscountTypeControl } from '@/modules/common/components/DiscountTypeControl';
import { DISCOUNT_TYPE, IDiscount } from '@/modules/ordenes/interfaces/IOrder';
import { Card } from '@/modules/common/components/Card';
import Loader from '@/modules/common/components/Loader';
import FieldLabel from '@/modules/common/components/FieldLabel';
import useCreateCoupon from '../hooks/useCreateCoupon';

export const CreateCoupon = () => {
  const {
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
  } = useCreateCoupon();

  return (
    <Card>
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
            <FieldLabel columnMode title="Fecha de expiracion:">
              <input
                type="date"
                {...register('dueDate')}
                className="w-full input-secondary"
              />
            </FieldLabel>
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
        <FieldLabel title="Agregar un producto" className="gap-2">
          <input
            type="checkbox"
            className="checkbox checkbox-primary order-first"
            checked={showProductList}
            onChange={handleCheckProduct}
          />
        </FieldLabel>
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
                    {`${selectedProduct?.type.emoji} ${selectedProduct?.name} ${selectedVariant?.name}`}
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

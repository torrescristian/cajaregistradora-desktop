import FormFieldText from '@/modules/common/components/FormFieldText';
import SearchInput from '@/modules/common/components/SearchInput';
import { MinusIcon } from '@heroicons/react/24/solid';
import { RenderIf } from '@/modules/common/components/RenderIf';
import { DiscountTypeControl } from '@/modules/common/components/DiscountTypeControl';
import { DISCOUNT_TYPE, IDiscount } from '@/modules/ordenes/interfaces/IOrder';
import { Card } from '@/modules/common/components/Card';
import Loader from '@/modules/common/components/Loader';
import FieldLabel from '@/modules/common/components/FieldLabel';
import useCreateCoupon from '../hooks/useCreateCoupon';
import { ProductItemMobile } from '@/modules/products/components/ProductItemMobile';

export const CreateCouponMobile = () => {
  const {
    handleSubmit,
    handleSubmitCreateCoupon,
    register,
    errors,
    setDiscountAmount,
    setDiscountType,
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
        className="flex flex-col gap-5 flex-wrap"
      >
        <div className="flex flex-col flex-wrap w-full gap-5">
          <div className="flex flex-col gap-5 flex-wrap">
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
                className="w-full text-center input-secondary"
              />
            </FieldLabel>
          </div>
          <div className="flex flex-col flex-wrap">
            <DiscountTypeControl
              onChangeAmount={setDiscountAmount}
              onChangeType={setDiscountType}
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
          <div className="flex flex-col flex-wrap">
            <FormFieldText
              errors={errors}
              register={register}
              formKey="availableUses"
              label="Cantidad de usos:"
            />
          </div>
        </div>
        <FieldLabel title="Agregar un producto" className="gap-5">
          <input
            type="checkbox"
            className="checkbox checkbox-primary order-first"
            checked={showProductList}
            onChange={handleCheckProduct}
          />
        </FieldLabel>
        <div className="flex flex-col items-center w-full gap-5 flex-wrap">
          <RenderIf condition={showProductList}>
            <RenderIf condition={!selectedVariant}>
              <div className="divider">Productos</div>
              <SearchInput {...searchProps} />
              <div className="flex flex-col overflow-x-scroll  h-[70vh]">
                {products.map((product) => (
                  <ProductItemMobile
                    key={product.id}
                    product={product}
                    onClick={handleClickAddProduct}
                  />
                ))}
              </div>
            </RenderIf>
            <RenderIf condition={selectedVariant}>
              <div className="divider">Producto selecionado</div>
              <div className="flex flex-col items-center p-5 gap-5 flex-wrap w-full border-2">
                <div className="flex flex-row justify-between w-full items-center ">
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
            className="btn btn-square w-max btn-primary"
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

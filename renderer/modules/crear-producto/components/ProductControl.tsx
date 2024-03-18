'use client';
import { IProduct } from '@/modules/products/interfaces/IProduct';
import CreateVariantsTable from '@/modules/crear-producto/components/CreateVariantsTable';
import SubmitButton from '@/modules/common/components/atoms/SubmitButton';
import FieldLabel from '@/modules/common/components/atoms/FieldLabel';

import useCreateProductPage from '../hooks/useCreateProductPage';

interface IProps {
  controlType: 'CREATE' | 'UPDATE';
  product?: IProduct;
}

const ProductControl = ({ controlType, product }: IProps) => {
  const {
    handleSubmitWrapper,
    register,
    productType,
    handleChangeProductType,
    productTypes,
    hasStockControl,
    handleChangeHasStockControl,
    variants,
    setVariants,
    setDefaultVariantIndex,
    defaultVariantIndex,
    isFormValid,
    createProductAndVariantMutation,
  } = useCreateProductPage({ controlType, product });

  return (
    <section className="">
      <form
        onSubmit={handleSubmitWrapper}
        className="flex flex-col p-5 gap-5 border-2 w-full items-center border-slate-500 shadow-2xl"
      >
        <div className="flex flex-col items-center gap-5 w-full">
          <FieldLabel
            columnMode
            title="Nombre:"
            className="input-group items-center"
          >
            <input
              type="text"
              className="input input-bordered input-secondary"
              {...register('name', { required: true })}
            />
          </FieldLabel>
          <FieldLabel columnMode title="Menu:" className="items-center gap-3 ">
            <select
              value={productType?.id!}
              onChange={handleChangeProductType}
              className="select select-bordered"
            >
              <option value={0}>Seleccione un menu</option>
              {productTypes?.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.emoji} {type.name}
                </option>
              ))}
            </select>
          </FieldLabel>
          <FieldLabel
            columnMode
            title="Imagen:"
            className="input-group items-center"
          >
            <input
              type="file"
              name="files"
              className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
            />
          </FieldLabel>
          <FieldLabel
            title="Control de stock"
            className="label w-fit gap-3 whitespace-nowrap"
          >
            <input
              type="checkbox"
              className="checkbox checkbox-success "
              value={String(hasStockControl)}
              onChange={handleChangeHasStockControl}
            />
          </FieldLabel>
        </div>

        <CreateVariantsTable
          hasStockControl={hasStockControl}
          variants={variants}
          setVariants={setVariants}
          onChange={setDefaultVariantIndex}
          defaultVariantIndex={defaultVariantIndex}
        />
        <SubmitButton
          disabled={!isFormValid || variants.length === 0}
          mutation={createProductAndVariantMutation}
          className="btn btn-success text-slate-50 whitespace-nowrap"
        >
          Crear producto
        </SubmitButton>
      </form>
    </section>
  );
};

export default ProductControl;

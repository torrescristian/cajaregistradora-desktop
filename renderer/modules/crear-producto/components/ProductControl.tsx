import { IProduct } from '@/modules/products/interfaces/IProduct';
import CreateVariantsTable from '@/modules/crear-producto/components/CreateVariantsTable';
import SubmitButton from '@/modules/common/components/SubmitButton';
import FieldLabel from '@/modules/common/components/FieldLabel';
import { CreateProductTypeMenuModal } from './CreateProductTypeMenuModal';
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
    isService,
    handleChangeIsService,
    variants,
    setVariants,
    setDefaultVariantIndex,
    defaultVariantIndex,
    isFormValid,
    createProductAndVariantMutation,
  } = useCreateProductPage({ controlType, product });

  return (
    <section>
      <form
        onSubmit={handleSubmitWrapper}
        className="flex flex-col p-5 gap-5 border-2 w-full items-center border-slate-500 shadow-2xl"
      >
        <section className="flex flex-row items-end gap-10 px-10 justify-between">
          <FieldLabel title="Nombre:" className="input-group items-center">
            <input
              type="text"
              className="input input-bordered input-secondary"
              {...register('name', { required: true })}
            />
          </FieldLabel>
          {product?.type.name!}
          <FieldLabel title="Menu:" className="items-center gap-3 ">
            <select
              value={productType?.id!}
              onChange={handleChangeProductType}
              className="select select-bordered"
              defaultValue={0}
            >
              <option value={0}>Seleccione un menu</option>
              {productTypes?.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.emoji} {type.name}
                </option>
              ))}
            </select>
          </FieldLabel>

          <FieldLabel title="Imagen:" className="input-group items-center">
            <input
              type="file"
              name="files"
              className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
            />
          </FieldLabel>
        </section>
        <FieldLabel title="Es un servicio" className="label w-fit gap-3">
          <input
            type="checkbox"
            className="checkbox checkbox-success"
            checked={isService}
            onChange={handleChangeIsService}
          />
        </FieldLabel>
        <CreateVariantsTable
          isService={isService}
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
      <CreateProductTypeMenuModal />
    </section>
  );
};

export default ProductControl;

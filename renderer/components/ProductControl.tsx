import FormFieldText from '@/components/FormFieldText';
import { useForm } from 'react-hook-form';
import { IProduct, IProductPayload, IProductType } from '@/interfaces/IProduct';
import { useImageControl } from '@/hooks/useImageControl';
import CreateVariantsTable from '@/components/CreateVariantsTable';
import { useState } from 'react';
import useCreateProductAndVariantMutation from '@/hooks/services/useCreateProductAndVariantMutation';
import { toast } from 'react-toastify';
import { IVariantPayload } from '@/interfaces/IVariants';
import useProductTypeQuery from '@/hooks/services/useProductTypesQuery';
import SubmitButton from './SubmitButton';
import { type } from 'os';
import { isAny } from 'tailwind-merge/dist/lib/validators';

interface IProps {
  controlType: 'CREATE' | 'UPDATE';
  product?: IProduct;
}

const ProductControl = ({ controlType, product }: IProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
    getValues,
  } = useForm<IProductPayload>({
    defaultValues: {
      name: product?.name || '',
      type: product?.type.id!,
      image: product?.image || '',
      isService: product?.isService || false,
    },
  });

  const productTypesQuery = useProductTypeQuery();
  const productTypes = productTypesQuery.data;
  const [productType, setProductType] = useState<IProductType>();
  const [isService, setIsService] = useState(false);
  const [variants, setVariants] = useState<IVariantPayload[]>([]);
  const [defaultVariantIndex, setDefaultVariantIndex] = useState<number>(0);
  const createProductAndVariantMutation = useCreateProductAndVariantMutation();
  const { processSubmit } = useImageControl();

  const handleChangeProductType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    const productType = productTypes?.find((type) => type.id === value)!;
    setProductType(productType);
    setValue('type', productType?.id!);
  };

  const handleChangeIsService = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setIsService(newValue);
    setValue('isService', newValue);
  };

  const handleClickSubmit = (data: IProductPayload) => {
    if (controlType === 'CREATE') {
      handleSubmitCreateProduct(data);
    }
  };

  const handleSubmitWrapper = async (e: any) => {
    const imageName = await processSubmit(e);
    handleSubmit((data: any) => {
      handleClickSubmit({
        ...data,
        image: imageName,
        type: data.type,
      });
    })(e);
  };

  const clearForm = () => {
    setIsService(false);
    setVariants([]);
    reset();
  };

  const { name, type } = getValues();
  const isFormValid = name && type;

  const handleSubmitCreateProduct = async (data: IProductPayload) => {
    try {
      await createProductAndVariantMutation.mutateAsync({
        data,
        variants,
        defaultVariantIndex,
      });
      toast.success('Producto creado correctamente');
      clearForm();
    } catch (error) {
      toast.error(`No se logro crear el producto`);
    }
  };

  return (
    <form
      onSubmit={handleSubmitWrapper}
      className="flex flex-col p-5 gap-5 border-2 w-full items-center border-slate-500 shadow-2xl"
    >
      <section className="flex flex-row items-end gap-10 px-10 justify-between">
        <FormFieldText
          errors={errors}
          formKey="name"
          label="Nombre: "
          register={register}
        />
        {product?.type.name!}
        <label>
          <span className="label-text whitespace-nowrap text-stone-500">
            Menu:
          </span>
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
        </label>
        <label className="input-group">
          <span className="label-text whitespace-nowrap text-stone-500">
            Imagen:
          </span>
          <input
            type="file"
            name="files"
            className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
          />
        </label>
      </section>
      <label className="label w-fit gap-3">
        <input
          type="checkbox"
          className="checkbox checkbox-success"
          checked={isService}
          onChange={handleChangeIsService}
        />
        Es un servicio
      </label>
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
  );
};

export default ProductControl;

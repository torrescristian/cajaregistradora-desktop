import FormFieldText from '@/components/FormFieldText';
import { useForm } from 'react-hook-form';
import IProductUI, {
  IProductPayload,
  PRODUCT_TYPE,
} from '@/interfaces/IProduct';
import useCreateProductMutation from '@/hooks/services/useCreateProductMutation';
import { useImageControl } from '@/hooks/useImageControl';
import CreateVariantsTable from '@/components/CreateVariantsTable';
import { useState } from 'react';

interface IProps {
  controlType: 'CREATE' | 'UPDATE';
  product?: IProductUI;
}

const ProductControl = ({ controlType, product }: IProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<IProductPayload>({
    defaultValues: {
      name: product?.name || '',
      type: product?.type,
      image: product?.image || '',
      isService: product?.isService || true,
    },
  });

  // we need to create this control apart of react-hook-form
  // because we need the reactivity of the selector to change the variant table
  const [productType, setProductType] = useState<PRODUCT_TYPE>('PIZZA');
  const [isService, setIsService] = useState(false);

  const handleChangeProductType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setProductType(value as PRODUCT_TYPE);
    setValue('type', productType);
  };

  const handleChangeIsService = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = !isService;

    setIsService(newValue);
    setValue('isService', newValue);
  };

  const createProductMutation = useCreateProductMutation();

  const handleSubmitCreateProduct = (data: IProductPayload) => {
    createProductMutation.mutate(data);
  };

  const { processSubmit } = useImageControl();

  const handleClickSubmit = (data: IProductPayload) => {
    if (controlType === 'CREATE') {
      handleSubmitCreateProduct(data);
    }
  };

  const handleSubmitWrapper = async (e: any) => {
    // 1. cargar imagen & obtener la url
    const imageName = await processSubmit(e);

    // 2. procesar el react-hook-form para obtener la data
    handleSubmit((data: any) => {
      // ...se crea data...
      handleClickSubmit({
        ...data,
        image: imageName,
        type: data.type,
      });
    })(e);
  };

  return (
    <form
      onSubmit={handleSubmitWrapper}
      className="flex flex-col p-5 gap-5 border-2 border-slate-500 shadow-2xl"
    >
      <section className="flex flex-row items-end gap-5">
        <FormFieldText
          errors={errors}
          formKey="name"
          label="Nombre: "
          register={register}
        />
        {product?.type!}
        <label>
          <span className="label-text whitespace-nowrap text-stone-500">
            Menu:
          </span>
          <select
            value={productType}
            onChange={handleChangeProductType}
            className="select select-bordered"
          >
            {['SODA', 'PIZZA', 'HAMBURGER'].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label>
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
          checked={!isService}
          onChange={handleChangeIsService}
        />
        Es un servicio
      </label>
      <CreateVariantsTable isService={isService} selectedType={productType} />
      <button type="submit" className="btn btn-primary">
        Crear producto
      </button>
    </form>
  );
};

export default ProductControl;

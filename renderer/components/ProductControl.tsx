import FormFieldText from '@/components/FormFieldText';
import { useForm } from 'react-hook-form';
import { IProduct, IProductPayload, PRODUCT_TYPE } from '@/interfaces/IProduct';
import { useImageControl } from '@/hooks/useImageControl';
import CreateVariantsTable from '@/components/CreateVariantsTable';
import { useState } from 'react';
import useCreateProductAndVariantMutation from '@/hooks/services/useCreateProductAndVariantMutation';
import { ToastContainer, toast } from 'react-toastify';
import { IVariantPayload } from '@/interfaces/IVariants';

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
  } = useForm<IProductPayload>({
    defaultValues: {
      name: product?.name || '',
      type: product?.type,
      image: product?.image || '',
      isService: product?.isService || false,
    },
  });

  const [productType, setProductType] = useState<PRODUCT_TYPE>('PIZZA');
  const [isService, setIsService] = useState(false);
  const [variants, setVariants] = useState<IVariantPayload[]>([]);
  const [defaultVariantIndex, setDefaultVariantIndex] = useState<number>(0);
  const createProductAndVariantMutation = useCreateProductAndVariantMutation();
  const { processSubmit } = useImageControl();

  const handleChangeProductType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as PRODUCT_TYPE;
    setProductType(value);
    setValue('type', value);
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

  const handleSubmitCreateProduct = async (data: IProductPayload) => {
    try {
      await createProductAndVariantMutation.mutateAsync({
        data,
        variants,
        defaultVariantIndex,
      });
      toast.success('Producto creado correctamente');
    } catch (error) {
      toast.error(`No se logro crear el producto`);
    }
  };

  return (
    <form
      onSubmit={handleSubmitWrapper}
      className="flex flex-col p-5 gap-5 border-2 w-full items-center border-slate-500 shadow-2xl"
    >
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <section className="flex flex-row items-end gap-10 px-10 justify-between">
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
        selectedType={productType}
        variants={variants}
        setVariants={setVariants}
        onChange={setDefaultVariantIndex}
        defaultVariantIndex={defaultVariantIndex}
      />
      <button type="submit" className="btn btn-success text-slate-50 w-2/12 ">
        Crear producto
      </button>
    </form>
  );
};

export default ProductControl;

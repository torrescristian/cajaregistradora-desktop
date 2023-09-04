import FormFieldText from '@/components/FormFieldText';
import { useForm } from 'react-hook-form';
import IProductUI, {
  IProductPayload,
  PRODUCT_TYPE,
} from '@/interfaces/IProduct';
import CheckboxButton from './CheckboxButton';
import { RenderIf } from './RenderIf';
import useCreateProductMutation from '@/hooks/services/useCreateProductMutation';
import { useImageControl } from '@/hooks/useImageControl';

interface IProps {
  controlType: 'CREATE' | 'UPDATE';
  product?: IProductUI;
}

const ProductControl = ({ controlType, product }: IProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IProductPayload>({
    defaultValues: {
      name: product?.name || '',
      type: product?.type,
      image: product?.image || '',
      isService: product?.isService || true,
    },
  });

  const createProductMutation = useCreateProductMutation();

  const handleSubmitCreateProduct = (data: IProductPayload) => {
    createProductMutation.mutate(data);
  };

  const handleSubmitUpdateProduct = () => {};

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
      <FormFieldText
        errors={errors}
        formKey="name"
        label="Nombre: "
        register={register}
      />
      {product?.type!}
      <RenderIf condition={controlType === 'UPDATE'}>
        <select
          className="select-bordered select w-full max-w-xs "
          {...register('default_variant')}
        >
          {product?.variants.map((variant) => (
            <option
              key={variant.id}
              value={variant.id}
              selected={product?.defaultVariant.id === variant.id}
            >
              {variant.name}
            </option>
          ))}
        </select>
      </RenderIf>

      <select {...register('type')} className="select select-bordered">
        {['SODA', 'PIZZA', 'HAMBURGER'].map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <input
        type="file"
        name="files"
        className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
      />
      <CheckboxButton
        name="isService"
        errors={errors}
        label="Es un servicio"
        register={register}
      />
      <button type="submit" className="btn btn-primary">
        Crear producto
      </button>
    </form>
  );
};

export default ProductControl;

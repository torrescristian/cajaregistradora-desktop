import { IVariantPayload } from '@/modules/common/interfaces/IVariants';
import useCreateProductAndVariantMutation from '@/modules/cupones/hooks/useCreateProductAndVariantMutation';
import { useImageControl } from '@/modules/cupones/hooks/useImageControl';
import useProductTypeQuery from '@/modules/products/hooks/useProductTypesQuery';
import {
  IProduct,
  IProductPayload,
  IProductType,
} from '@/modules/products/interfaces/IProduct';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface IProps {
  controlType: 'CREATE' | 'UPDATE';
  product?: IProduct;
}

export default function useCreateProductPage({ controlType, product }: IProps) {
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
      image: product?.image || '',
      isService: product?.isService || true,
    },
  });

  const productTypesQuery = useProductTypeQuery();
  const productTypes = productTypesQuery.data || [];
  const [productType, setProductType] = useState<IProductType | null>(
    productTypes[0],
  );
  const [hasStockControl, setHasStockControl] = useState(false);
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

  const handleChangeHasStockControl = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = e.target.checked;
    setHasStockControl(newValue);
    setValue('isService', !newValue);
  };

  const handleClickSubmit = (data: IProductPayload) => {
    if (controlType === 'CREATE') {
      handleSubmitCreateProduct(data);
    }
  };

  const handleSubmitWrapper = async (e: any) => {
    e.preventDefault();
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
    setHasStockControl(true);
    setVariants([]);
    reset();
    setValue('type', productType?.id!);
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
      toast.success(`Producto creado correctamente ${data.name}`);
      clearForm();
    } catch (error) {
      toast.error(`No se logro crear el producto`);
    }
  };
  return {
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
  };
}

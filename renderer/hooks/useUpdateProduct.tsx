import useFormControl from './useFormControl';
import IProductUI from '@/interfaces/IProduct';
import useUpdateProductMutation from '@/hooks/services/useUpdateProductMutation';
import { useMemo } from 'react';

interface IUseUpdateProductFormProps {
  product: IProductUI;
}

const useUpdateProductForm = ({ product }: IUseUpdateProductFormProps) => {
  // STATE
  const updateProductMutation = useUpdateProductMutation();

  const { value: name, handleChange: handleChangeName } = useFormControl(
    product.name,
  );
  const { value: stock, handleChange: handleChangeStock } = useFormControl(
    product.name,
  );

  const pendingChanges = useMemo(() => {
    if (!product) {
      return false;
    }

    return product.name !== name;
  }, [product, name]);

  // HANDLERS
  const handleSubmit = () => () => {
    updateProductMutation.mutate(product);
  };

  return {
    error: updateProductMutation.error,
    handleChangeName,
    handleSubmit,
    isError: updateProductMutation.isError,
    isLoading: updateProductMutation.isLoading,
    name,
    pendingChanges,
    stock,
    handleChangeStock,
  };
};

export default useUpdateProductForm;

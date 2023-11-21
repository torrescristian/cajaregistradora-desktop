import useFormControl from '../../common/hooks/useFormControl';
import { IProduct } from '@/modules/products/interfaces/IProduct';
import useUpdateProductMutation from '@/modules/reabastecer/hooks/useUpdateProductMutation';
import { useMemo} from 'react';
import { IVariantExpanded } from '@/modules/common/interfaces/IVariants';
;

interface IUseUpdateProductFormProps {
  product: IProduct;
  variant: IVariantExpanded;
}

const useUpdateProductForm = ({
  product,
  variant,
}: IUseUpdateProductFormProps) => {
  // STATE
  const updateProductMutation = useUpdateProductMutation();

  const { value: productName, handleChange: handleChangeName } = useFormControl(
    product.name,
  );
  const { handleChange: handleChangeVariantName, value: variantName } =
    useFormControl(variant.name);

  const pendingChanges = useMemo(() => {
    if (!product) {
      return false;
    }
    if (!variant) {
      return false;
    }

    return product.name !== productName || variant.name !== variantName;
  }, [product, productName, variant, variantName]);

  // HANDLERS
  const handleSubmit = () => () => {
    updateProductMutation.mutate({
      id: product.id!,
      name: productName,
    });
  };

  return {
    error: updateProductMutation.error,
    handleChangeName,
    handleSubmit,
    isError: updateProductMutation.isError,
    isLoading: updateProductMutation.isLoading,
    productName,
    pendingChanges,
    variantName,
    handleChangeVariantName,
  };
};

export default useUpdateProductForm;

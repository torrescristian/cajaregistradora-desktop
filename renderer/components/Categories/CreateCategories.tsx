import useCreateCategoryMutation from '@/hooks/services/useCreateCategoryMutation';
import useProductsQuery from '@/hooks/services/useProductsQuery';
import { IProduct } from '@/interfaces/IProduct';
import React, { useState } from 'react';
import SearchInput, { useSearchProps } from '../SearchInput';
import ProductItem from '../ProductItem';
import { IVariantPromo } from '@/interfaces/IVariants';
import { MinusIcon } from '@heroicons/react/24/solid';
import { RenderIf } from '../RenderIf';
import useFormControl from '@/hooks/useFormControl';
import FieldWrapper from '../FieldWrapper';
import { Divider } from '../Sale/Sale.styles';
import Loader from '../Loader';
import { toast } from 'react-toastify';
import CustomToastContainer from '../CustomToastContainer';
import SubmitButton from '../SubmitButton';

export const CreateCategories = () => {
  const createCategoryMutation = useCreateCategoryMutation();
  const searchProps = useSearchProps();
  const productsQuery = useProductsQuery({
    query: searchProps.query,
    selectedProductType: 0,
  });
  const products = productsQuery.products as IProduct[];

  // FIXME: replace for useArray
  const [newVariantSelected, setNewVariantSelected] = useState<IVariantPromo[]>(
    [],
  );
  const {
    value: name,
    handleChange: handleChangeName,
    setValue: setName,
  } = useFormControl('');

  const handleClickAddProduct = (props: {
    product: IProduct;
    variant: IVariantPromo;
  }) => {
    setNewVariantSelected([
      ...newVariantSelected,
      {
        id: props.variant.id!,
        name: props.variant.name,
        product: props.product,
        price: props.variant.price,
        stock_per_variant: props.variant.stock_per_variant,
      },
    ]);
  };

  const handleClickRemoveVariant =
    (indexToRemove: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      setNewVariantSelected(
        newVariantSelected.filter((_, index) => index !== indexToRemove),
      );
    };

  const clearForm = () => {
    setName('');
    setNewVariantSelected([]);
  };

  const handleSubmitCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newCategory = await createCategoryMutation.mutateAsync({
        name,
        variants: newVariantSelected.map((variant) => variant.id!),
      });

      clearForm();
      toast.success(
        `Categoría "${newCategory.data.attributes.name}" creada con éxito!`,
      );
    } catch (error) {
      console.log({ error });
      toast.error(`Error al crear la categoría`);
    }
  };
  return (
    <section className="w-full">
      <CustomToastContainer />
      <div className="flex flex-col items-center">
        <h1 className="text-2xl mb-5">Crea tu categoria</h1>
        <form
          className="flex flex-col gap-3 w-[80vw]"
          onSubmit={handleSubmitCategory}
        >
          <div className="flex flex-col items-center gap-3">
            <FieldWrapper
              title="Nombre:"
              className="flex-row gap-5 items-center"
            >
              <input
                type="text"
                className="input input-bordered"
                value={name}
                onChange={handleChangeName}
              />
            </FieldWrapper>
          </div>
          <Divider>Agrega productos a la categoría</Divider>
          <div className="flex flex-col">
            <SearchInput {...searchProps} />
            <div className="flex flex-row overflow-x-scroll gap-5 p-5">
              {products.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  onClick={handleClickAddProduct}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-row">
            <RenderIf condition={!newVariantSelected}> </RenderIf>
            <RenderIf condition={newVariantSelected}>
              <div className="flex flex-col gap-5">
                <div className="flex flex-row gap-5 items-center overflow-x-scroll w-[80vw] ">
                  {newVariantSelected.map((variant, index) => (
                    <div className="flex flex-row items-center gap-3 p-3 border-2 ">
                      <p>
                        {variant.product.type.emoji} {variant.product.name} -{' '}
                        {variant.name}
                      </p>
                      <button
                        className="btn btn-error"
                        onClick={handleClickRemoveVariant(index)}
                      >
                        <MinusIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </RenderIf>
          </div>
          <SubmitButton
            className="btn btn-success text-neutral-content w-80 self-end"
            mutation={createCategoryMutation}
          >
            Crear Categoria
          </SubmitButton>
        </form>
      </div>
    </section>
  );
};

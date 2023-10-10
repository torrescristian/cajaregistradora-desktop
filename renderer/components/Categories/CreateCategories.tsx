import useCreateCategoryMutation from '@/hooks/services/useCreateCategoryMutation';
import useProductsQuery from '@/hooks/services/useProductsQuery';
import { IProduct, PRODUCT_TYPE } from '@/interfaces/IProduct';
import React, { useState } from 'react';
import SearchInput, { useSearchProps } from '../SearchInput';
import ProductItem from '../ProductItem';
import { IVariant, IVariantPromo } from '@/interfaces/IVariants';
import { convertToEmoji, formatPrice } from '@/libs/utils';
import { MinusIcon } from '@heroicons/react/24/solid';
import { RenderIf } from '../RenderIf';
import useFormControl from '@/hooks/useFormControl';
import FieldWrapper from '../FieldWrapper';
import { Divider } from '../Sale/Sale.styles';

export const CreateCategories = () => {
  const createCategoryMutation = useCreateCategoryMutation();
  const [selectedProductType, setSelectedProductType] =
    useState<PRODUCT_TYPE>('');
  const searchProps = useSearchProps();
  const productsQuery = useProductsQuery({
    query: searchProps.query,
    selectedProductType,
  });
  const products = productsQuery.products as IProduct[];

  const [newVariantSelected, setNewVariantSelected] = useState<IVariantPromo[]>(
    [],
  );
  const { value: name, handleChange: handleChangeName } = useFormControl('');

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

  const handleSubmitCategory = (e: React.FormEvent) => {
    e.preventDefault();
    return createCategoryMutation.mutate({
      name,
      variants: newVariantSelected.map((variant) => variant.id!),
    });
  };
  return (
    <section className="w-full">
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
                        {convertToEmoji(variant.product.type)}{' '}
                        {variant.product.name} - {variant.name}
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
          <button
            className="btn btn-success text-neutral-content w-80 self-end"
            type="submit"
          >
            Crear Categoria
          </button>
        </form>
      </div>
    </section>
  );
};

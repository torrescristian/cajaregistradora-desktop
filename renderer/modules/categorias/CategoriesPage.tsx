import useCreateCategoryMutation from '@/modules/categorias/hooks/useCreateCategoryMutation';
import useProductsQuery from '@/modules/products/hooks/useProductsQuery';
import { IProduct } from '@/modules/products/interfaces/IProduct';
import React, { useState } from 'react';
import SearchInput, {
  useSearchProps,
} from '@/modules/common/components/SearchInput';
import ProductItem from '@/modules/products/components/ProductItem';
import {
  IVariantPromo,
  STATUS_VARIANTS,
} from '@/modules/common/interfaces/IVariants';
import { MinusIcon } from '@heroicons/react/24/solid';
import { RenderIf } from '@/modules/common/components/RenderIf';
import useFormControl from '@/modules/common/hooks/useFormControl';
import FieldLabel from '@/modules/common/components/FieldLabel';
import { toast } from 'react-toastify';
import SubmitButton from '@/modules/common/components/SubmitButton';
import { Divider } from '@/modules/cart/components/Sale/Sale.styles';
import { ButtonPagination, useButtonPagination } from '../reabastecer/components/ButtonPagination';

export default function CategoriesPage() {
  const paginationControls = useButtonPagination();
  const createCategoryMutation = useCreateCategoryMutation();
  const searchProps = useSearchProps();
  const productsQuery = useProductsQuery({
    query: searchProps.query,
    selectedProductType: 0,
    page: paginationControls.page,
    setTotalPages: paginationControls.setTotalPages,
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
        status: STATUS_VARIANTS.ENABLED,
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
      <div className="flex flex-col items-center">
        <h1 className="text-2xl mt-16">Crea tu categoria</h1>
        <form
          className="flex flex-col gap-5 p-4 w-[90vw]"
          onSubmit={handleSubmitCategory}
        >
          <div className="flex flex-col items-center gap-3">
            <FieldLabel columnMode title="Nombre:">
              <input
                type="text"
                className="input input-bordered"
                value={name}
                onChange={handleChangeName}
              />
            </FieldLabel>
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
            <ButtonPagination {...paginationControls} />
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
            className="btn btn-success text-base-content w-80 self-end"
            mutation={createCategoryMutation}
            disabled={!name || !newVariantSelected.length}
          >
            Crear Categoria
          </SubmitButton>
        </form>
      </div>
    </section>
  );
}

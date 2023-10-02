import useCategoryQuery from '@/hooks/services/useCategoryQuery';
import { RenderIf } from '../RenderIf';
import ProductItem from '../ProductItem';
import SearchInput, { useSearchProps } from '../SearchInput';
import useProductsQuery from '@/hooks/services/useProductsQuery';
import { IProduct, PRODUCT_TYPE } from '@/interfaces/IProduct';
import React, { useState } from 'react';
import { IVariant } from '@/interfaces/IVariants';
import { formatPrice } from '@/libs/utils';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import useCreatePromoMutation from '@/hooks/services/useCreatePromoMutation';
import useFormControl from '@/hooks/useFormControl';
import { ICategory } from '@/interfaces/ICategory';
import { set } from 'react-hook-form';
import { ICategoryAndQuantity, IVariantAndQuantity } from '@/interfaces/IPromo';

export const CreatePromo = () => {
  const categoryQuery = useCategoryQuery();
  const createPromoMutation = useCreatePromoMutation();
  const [selectedProductType, setSelectedProductType] =
    useState<PRODUCT_TYPE>('');
  const searchProps = useSearchProps();
  const productsQuery = useProductsQuery({
    query: searchProps.query,
    selectedProductType,
  });
  const products = productsQuery.products as IProduct[];

  const [selectedVariantList, setSelectedVariantList] = useState<
    IVariantAndQuantity[]
  >([]);
  const [selectedCategoryList, setSelectedCategoryList] = useState<
    ICategoryAndQuantity[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategory>();

  const categories = categoryQuery.data;

  const { value: name, handleChange: handleChangeName } = useFormControl('');
  const { value: price, handleChange: handleChangePrice } = useFormControl('');

  const handleClickAddProduct = (props: {
    product: IProduct;
    variant: IVariant;
  }) => {
    let newVariantList = [];
    if (
      selectedVariantList.find(({ variant }) => variant.id === props.variant.id)
    ) {
      newVariantList = selectedVariantList.map(({ variant, quantity }) => {
        if (variant.id === props.variant.id) {
          return { variant, quantity: quantity + 1 };
        }
        return { variant, quantity };
      });
    } else {
      newVariantList = [
        ...selectedVariantList,
        {
          variant: props.variant,
          quantity: 1,
        },
      ];
    }
    setSelectedVariantList(newVariantList);
  };

  const handleClickAddCategory = () => {
    if (!selectedCategory) return;
    if (
      selectedCategoryList.find(
        ({ category }) => category.id === selectedCategory.id,
      )
    ) {
      setSelectedCategoryList(
        selectedCategoryList.map(({ category, quantity }) => {
          if (category.id === selectedCategory.id) {
            return { category, quantity: quantity + 1 };
          }
          return { category, quantity };
        }),
      );
      return
    }
    setSelectedCategoryList([...selectedCategoryList,
    {
      category: selectedCategory,
      quantity: 1,
    }]);
  };
  const handleChangeSelectedCategory = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedCategoryId = Number(e.target.value);
    setSelectedCategory(
      categories?.find((category) => category.id === selectedCategoryId),
    );
  };

  const handleClickRemoveVariant =
    (indexToRemove: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      setSelectedVariantList(
        selectedVariantList.filter((_, index) => index !== indexToRemove),
      );
    };
  const handleClickRemoveCategory =
    (indexToRemove: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      setSelectedCategoryList(
        selectedCategoryList.filter((_, index) => index !== indexToRemove),
      );
    };

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    return createPromoMutation.mutate({
      name,
      price,
      variants: selectedVariantList.map(({ variant, quantity }) => ({ variant: variant.id!, quantity })),
      categories: selectedCategoryList.map(({ category, quantity }) => ({ category: category.id!, quantity })),
    });
  };

  return (
    <section className="flex flex-col w-full">
      <div className="flex flex-col gap-3 items-center p-3">
        <form
          className="flex flex-col border-2 p-5 gap-7 items-center"
          onSubmit={handleCreatePromo}
        >
          <p>Crea tu promo!</p>
          <div className="flex flex-row gap-5 w-full justify-around p-5 ">
            <label className="text-xl">
              Nombre : {''}
              <input
                type="text"
                className="input input-bordered w-36"
                value={name}
                onChange={handleChangeName}
              />
            </label>
            <label className="text-xl">
              Precio : {''}
              <input
                type="number"
                className="input input-bordered w-36"
                value={price}
                onChange={handleChangePrice}
              />
            </label>
          </div>
          <RenderIf condition={categories?.length}>
            <div className="flex flex-row items-center gap-3">
              <select
                className="select select-bordered w-52"
                onChange={handleChangeSelectedCategory}
                value={selectedCategory?.id}
              >
                <option value="">Selecciona una categoria</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-success text-primary-content btn-square"
                onClick={handleClickAddCategory}
              >
                <PlusIcon className="w-9 h-9" />
              </button>
              <div className="flex flex-row gap-3 overflow-x-scroll w-96 ">
                <div className="flex">
                  {selectedCategoryList.map(({ category, quantity }, index) => (
                    <div className="flex flex-row  border-2 p-3 gap-4">
                      <div className='flex flex-col text-center whitespace-nowrap'>
                        <p key={category.id} className='text-2xl font-bold'>{category.name}</p>
                        <div className='flex flex-row items-center p-4 gap-4'>
                          <button className='btn btn-success'>
                            <PlusIcon className='w-5 h-5' />
                          </button>
                          <p className='text-xl'>x{quantity}</p>
                          <button className='btn btn-error'>
                            <MinusIcon className='w-5 h-5' />
                          </button>
                        </div>
                      </div>
                      <button
                        className="btn btn-error"
                        onClick={handleClickRemoveCategory(index)}
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RenderIf>
          <RenderIf condition={!categories}>
            <p>No hay categorias</p>
          </RenderIf>
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
          <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-5 overflow-x-scroll w-[80vw] ">
              {selectedVariantList.map(({ variant, quantity }, index) => (
                <div className="flex flex-col gap-3 items-center p-3 border-2 ">
                  <div className='flex flex-row justify-between gap-3 w-full items-center'>
                    <p className='text-xl'>{variant.name} {formatPrice(variant.price)}</p>
                    <button
                      className="btn btn-error"
                      onClick={handleClickRemoveVariant(index)}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <div className='flex flex-row items-center p-4 gap-4'>
                    <button className='btn btn-success'>
                      <PlusIcon className='w-5 h-5' />
                    </button>
                    <p className='text-xl'>x{quantity}</p>
                    <button className='btn btn-error'>
                      <MinusIcon className='w-5 h-5' />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="btn btn-primary" type="submit">
            Crear Promo
          </button>
        </form>
      </div>
    </section>
  );
};

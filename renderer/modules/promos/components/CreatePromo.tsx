import useCategoryQuery from '@/modules/categorias/hooks/useCategoryQuery';
import { RenderIf } from '@/modules/common/components/RenderIf';
import ProductItem from '@/modules/products/components/ProductItem';
import SearchInput, {
  useSearchProps,
} from '@/modules/common/components/SearchInput';
import useProductsQuery from '@/modules/products/hooks/useProductsQuery';
import { IProduct, IProductType } from '@/modules/products/interfaces/IProduct';
import React, { useState } from 'react';
import { IVariantExpanded } from '@/modules/common/interfaces/IVariants';
import { PlusIcon } from '@heroicons/react/24/solid';
import useCreatePromoMutation from '@/modules/promos/hooks/useCreatePromoMutation';
import useFormControl from '@/modules/common/hooks/useFormControl';
import { ICategoryExpanded } from '@/modules/categorias/interfaces/ICategory';
import {
  ICategoryAndQuantity,
  IVariantAndQuantity,
  PROMO_STATUS,
} from '@/modules/promos/interfaces/IPromo';
import CardVariantList from './CardVariantList';
import CardCategoryList from './CardCategoryList';
import SubmitButton from '@/modules/common/components/SubmitButton';
import { toast } from 'react-toastify';
import FieldLabel from '@/modules/common/components/FieldLabel';

export const CreatePromo = () => {
  const categoryQuery = useCategoryQuery();
  const createPromoMutation = useCreatePromoMutation();
  const [selectedProductType, setSelectedProductType] =
    useState<IProductType>();
  const searchProps = useSearchProps();
  const productsQuery = useProductsQuery({
    query: searchProps.query,
    selectedProductType: selectedProductType?.id!,
  });
  const products = productsQuery.products as IProduct[];

  const [selectedVariantList, setSelectedVariantList] = useState<
    IVariantAndQuantity[]
  >([]);
  const [selectedCategoryList, setSelectedCategoryList] = useState<
    ICategoryAndQuantity[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategoryExpanded>();

  const categories = categoryQuery.data;

  const {
    value: name,
    handleChange: handleChangeName,
    setValue: setName,
  } = useFormControl('');
  const {
    value: price,
    handleChange: handleChangePrice,
    setValue: setPrice,
  } = useFormControl('');

  const handleClickAddProduct = (props: {
    product: IProduct;
    variant: IVariantExpanded;
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

  const incrementCategoryByOne = (categoryId: number) => {
    setSelectedCategoryList(
      selectedCategoryList.map(({ category, quantity }) => {
        if (category.id === categoryId) {
          return { category, quantity: quantity + 1 };
        }
        return { category, quantity };
      }),
    );
  };

  const handleClickAddCategory = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;
    if (
      selectedCategoryList.find(
        ({ category }) => category.id === selectedCategory.id,
      )
    ) {
      incrementCategoryByOne(selectedCategory.id!);
      return;
    }
    setSelectedCategoryList([
      ...selectedCategoryList,
      {
        category: selectedCategory,
        quantity: 1,
      },
    ]);
  };

  const handleChangeSelectedCategory = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedCategoryId = Number(e.target.value);
    setSelectedCategory(
      categories?.find((category) => category.id === selectedCategoryId),
    );
  };

  const clearForm = () => {
    setSelectedVariantList([]);
    setSelectedCategoryList([]);
    setName('');
    setPrice('');
  };

  const handleCreatePromo = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newPromo = await createPromoMutation.mutateAsync({
        name,
        price,
        variants: selectedVariantList.map(({ variant, quantity }) => ({
          variant: variant.id!,
          quantity,
        })),
        categories: selectedCategoryList.map(({ category, quantity }) => ({
          category: category.id!,
          quantity,
        })),
        status: PROMO_STATUS.ENABLED,
      });

      clearForm();
      toast.success(
        `Promoción "${newPromo.data.attributes.name}" creada con éxito!`,
      );
    } catch (error) {
      console.log({ error });
      toast.error(`Error al crear la promoción`);
    }
  };

  return (
    <section className="flex flex-col">
      <div className="flex flex-col gap-3 items-center p-3">
        <form
          className="flex flex-col p-5 gap-7 items-start"
          onSubmit={handleCreatePromo}
        >
          <div className="flex flex-row gap-5  justify-start items-end p-5">
            <FieldLabel title="Nombre:" className="flex flex-col">
              <input
                type="text"
                className="input input-bordered "
                value={name}
                onChange={handleChangeName}
              />
            </FieldLabel>
            <FieldLabel title="Precio:" className="flex flex-col">
              <input
                type="number"
                className="input input-bordered w-36"
                value={price}
                onChange={handleChangePrice}
              />
            </FieldLabel>
            <RenderIf condition={categories?.length}>
              <div className="flex flex-row items-end">
                <FieldLabel title="Categorias:" className="flex flex-col">
                  <select
                    className="select select-bordered "
                    onChange={handleChangeSelectedCategory}
                    value={selectedCategory?.id}
                    defaultValue={0}
                  >
                    <option value={0}>Seleccione una categoria</option>
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </FieldLabel>
                <button
                  className="btn btn-primary"
                  onClick={handleClickAddCategory}
                >
                  <PlusIcon className="w-9 h-9" /> Agregar
                </button>
              </div>
            </RenderIf>
          </div>
          <RenderIf condition={categories?.length}>
            <div className="flex flex-row items-center gap-3">
              <div className="flex flex-row gap-3 overflow-x-scroll w-[70vw] ">
                <CardCategoryList
                  selectedCategoryList={selectedCategoryList}
                  setSelectedCategoryList={setSelectedCategoryList}
                  incrementCategoryByOne={incrementCategoryByOne}
                />
              </div>
            </div>
          </RenderIf>
          <RenderIf condition={!categories}>
            <p>No hay categorias</p>
          </RenderIf>
          <div className="flex flex-col">
            <SearchInput {...searchProps} />
            <div className="flex flex-row overflow-x-scroll w-[80vw] gap-5 p-5">
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
            <CardVariantList
              selectedVariantList={selectedVariantList}
              setSelectedVariantList={setSelectedVariantList}
            />
          </div>
          <SubmitButton
            mutation={createPromoMutation}
            className="btn btn-primary w-64 self-end"
            disabled={
              (selectedVariantList.length === 0 &&
                selectedCategoryList.length === 0) ||
              !name ||
              !price
            }
          >
            Crear Promo
          </SubmitButton>
        </form>
      </div>
    </section>
  );
};

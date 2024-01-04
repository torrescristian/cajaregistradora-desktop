import { PencilIcon, PlusIcon } from '@heroicons/react/24/solid';
import React, { useRef, useState } from 'react';
import CardCategoryList from './CardCategoryList';
import {
  ICategoryAndQuantity,
  IPromo,
  IVariantAndQuantity,
} from '@/modules/promos/interfaces/IPromo';
import FieldLabel from '@/modules/common/components/FieldLabel';
import useCategoryQuery from '@/modules/categorias/hooks/useCategoryQuery';
import { ICategoryExpanded } from '@/modules/categorias/interfaces/ICategory';
import SearchInput, {
  useSearchProps,
} from '@/modules/common/components/SearchInput';
import ProductItem from '@/modules/products/components/ProductItem';
import CardVariantList from './CardVariantList';
import useProductsQuery from '@/modules/products/hooks/useProductsQuery';
import { IProduct, IProductType } from '@/modules/products/interfaces/IProduct';
import { IVariantPromo } from '@/modules/common/interfaces/IVariants';
import useFormControl from '@/modules/common/hooks/useFormControl';
import useUpdatePromo from '@/modules/promos/hooks/useUpdatePromo';
import { toast } from 'react-toastify';
import { ButtonClose } from '@/modules/common/components/ButtonClose';

interface IProps {
  promo: IPromo;
}

export const EditPromoModal = ({ promo }: IProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  const categoryQuery = useCategoryQuery();
  const categories = categoryQuery.data;

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
  >(promo.variants || []);
  const [selectedCategoryList, setSelectedCategoryList] = useState<
    ICategoryAndQuantity[]
  >(promo.categories || []);
  const [selectedCategory, setSelectedCategory] = useState<ICategoryExpanded>();

  const updatePromo = useUpdatePromo();

  const {
    value: name,
    handleChange: handleChangeName,
    setValue: setName,
  } = useFormControl(promo.name || '');
  const {
    value: price,
    handleChange: handleChangePrice,
    setValue: setPrice,
  } = useFormControl(promo.price || '');

  const handleClickAddProduct = (props: {
    product: IProduct;
    variant: IVariantPromo;
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
  const handleChangeSelectedCategory = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedCategoryId = Number(e.target.value);
    setSelectedCategory(
      categories?.find((category) => category.id === selectedCategoryId),
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

  const handleSubmitUpdatePromo = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const newPromo = await updatePromo.mutateAsync({
        id: promo.id,
        name,
        price,
        categories: selectedCategoryList,
        variants: selectedVariantList,
        status: promo.status,
      });
      toast.success('Promo actualizada');
      ref.current?.close();
    } catch (error) {
      toast.error('Error al actualizar promo');
    }
  };

  return (
    <section className="w-full">
      <button
        className="btn btn-primary"
        onClick={() => ref.current?.showModal()}
      >
        <PencilIcon className="w-5 h-5" />
      </button>
      <dialog ref={ref} className=" items-end bg-base-100 p-10">
        <form className="flex flex-col w-full">
          <div>
            <div className="flex flex-row w-full justify-evenly">
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
                  className="btn btn-primary text-neutral-content"
                  onClick={handleClickAddCategory}
                >
                  <PlusIcon className="w-9 h-9" /> Agregar
                </button>
              </div>
            </div>
            <div className="w-[70vw] overflow-x-scroll">
              <CardCategoryList
                selectedCategoryList={selectedCategoryList}
                setSelectedCategoryList={setSelectedCategoryList}
                incrementCategoryByOne={incrementCategoryByOne}
              />
            </div>
          </div>
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
          <div className="flex flex-row w-full p-5 justify-end gap-5">
            <button
              className="btn btn-success text-neutral-content"
              onClick={handleSubmitUpdatePromo}
            >
              Actualizar
            </button>
            <ButtonClose
              label="Cerrar"
              className="btn btn-error text-neutral-content"
              onClick={() => ref.current?.close()}
            />
          </div>
        </form>
      </dialog>
    </section>
  );
};

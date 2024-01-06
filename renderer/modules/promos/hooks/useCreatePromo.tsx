import useCategoryQuery from '@/modules/categorias/hooks/useCategoryQuery';
import { toast } from 'react-toastify';
import useCreatePromoMutation from './useCreatePromoMutation';
import { IProduct, IProductType } from '@/modules/products/interfaces/IProduct';
import { useState } from 'react';
import { useSearchProps } from '@/modules/common/components/SearchInput';
import useProductsQuery from '@/modules/products/hooks/useProductsQuery';
import {
  ICategoryAndQuantity,
  IVariantAndQuantity,
  PROMO_STATUS,
} from '../interfaces/IPromo';
import { ICategoryExpanded } from '@/modules/categorias/interfaces/ICategory';
import useFormControl from '@/modules/common/hooks/useFormControl';
import { IVariantExpanded } from '@/modules/common/interfaces/IVariants';
import { useButtonPagination } from '@/modules/reabastecer/components/ButtonPagination';

export default function useCreatePromo() {
  const paginationControls = useButtonPagination();
  const categoryQuery = useCategoryQuery();
  const createPromoMutation = useCreatePromoMutation();
  const [selectedProductType, setSelectedProductType] =
    useState<IProductType>();
  const searchProps = useSearchProps();
  const productsQuery = useProductsQuery({
    query: searchProps.query,
    page: paginationControls.page,
    setTotalPages: paginationControls.setTotalPages,
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

  return {
    handleCreatePromo,
    handleChangeName,
    name,
    price,
    handleChangePrice,
    categories,
    handleChangeSelectedCategory,
    selectedCategory,
    handleClickAddCategory,
    selectedCategoryList,
    setSelectedCategoryList,
    incrementCategoryByOne,
    searchProps,
    handleClickAddProduct,
    products,
    selectedVariantList,
    setSelectedVariantList,
    createPromoMutation,
    paginationControls,
  };
}

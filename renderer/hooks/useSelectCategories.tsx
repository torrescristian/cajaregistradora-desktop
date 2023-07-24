import useFormControl from '@/hooks/useFormControl';
import useCategories, { ICategoryUI } from '@/hooks/useCategories';
import { toLC } from '@/libs/utils';
import useFilterMenuQuery from '@/hooks/services/useFilterMenuQuery';
import { useState } from 'react';

export default function useSelectCategoriesProps() {
  const filterMenuQuery = useFilterMenuQuery();

  const [categories, setCategories] = useState<ICategoryUI[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategoryUI>();
  // TODO: remove
  const categoriesQuery = useCategories(filterMenuQuery.data!);
  const subcategories = categoriesQuery.categories
    .map((c) => c.subcategories)
    .flat()
    .filter((c) => {
      return !['articulos', 'modelos'].includes(toLC(c.parent?.name!));
    });

  const handleChangeCategories = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);

    const _selectedCategory = subcategories.find(({ id }) => id === value)!;

    if (!_selectedCategory) {
      return;
    }

    setSelectedCategory(_selectedCategory);
  };

  const handleChangeRemoveCategory = (id: number) => () => {
    const selectedCategories = categories.filter((c) => c.id !== id);

    setCategories(selectedCategories);
  };

  const handleClickAddCategory = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!selectedCategory) {
      return;
    }

    if (categories.some((c) => c.id === selectedCategory.id)) {
      return;
    }

    const selectedCategories = [...categories, selectedCategory];

    setCategories(selectedCategories);
  };

  const {
    value: categoriesFilter,
    handleChange: handleChangeCategoriesFilter,
  } = useFormControl('');

  return {
    subcategories,
    categories,
    categoriesFilter,
    handleChangeCategoriesFilter,
    handleChangeCategories,
    handleClickAddCategory,
    handleChangeRemoveCategory,
  };
}

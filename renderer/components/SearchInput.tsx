import useCategories, { ICategoryUI } from '@/hooks/useCategories';
import useFilterMenuQuery from '@/hooks/services/useFilterMenuQuery';
import ErrorMessage from '@/components/ErrorMessage';
import Loader from '@/components/Loader';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import FilterMenu from './FilterMenu';

export const useSearchProps = () => {
  const [search, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [query] = useDebounce(search, 500);
  const filterMenuQuery = useFilterMenuQuery();
  const { categories, initialize } = useCategories(filterMenuQuery.data!);

  // handlers
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  const handleToggleSelectedCategory = (categoryId: number) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((sc) => sc !== categoryId)
      );
      return;
    }

    setSelectedCategories([...selectedCategories, categoryId]);
  };

  return {
    query,
    search,
    onSearch,
    filterMenuQuery,
    categories,
    initialize,
    toggleSelectedCategory: handleToggleSelectedCategory,
    selectedCategories,
  };
};

interface ISearchInputProps {
  search: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filterMenuQuery: any;
  categories: ICategoryUI[];
  initialize: any;
  toggleSelectedCategory: any;
  disableFilter?: boolean;
  selectedCategories: number[];
}

export default function SearchInput({
  search,
  onSearch,
  categories,
  filterMenuQuery,
  initialize,
  toggleSelectedCategory,
  disableFilter,
  selectedCategories,
}: ISearchInputProps) {
  return (
    <section
      data-test="search-input"
      className="form-control flex w-full flex-row bg-white"
    >
      {!disableFilter && filterMenuQuery.isLoading && (
        <Loader className="w-2/12" />
      )}
      {!disableFilter && filterMenuQuery.isSuccess && (
        <FilterMenu
          categories={categories}
          data={filterMenuQuery.data}
          initialize={initialize}
          selectedCategories={selectedCategories}
          toggleSelectedCategory={toggleSelectedCategory}
        />
      )}
      <input
        data-test="search-input-field"
        value={search}
        onChange={onSearch}
        type="text"
        placeholder="Buscar producto..."
        className="input-bordered input w-full shadow-inner hover:border-none"
      />
      {filterMenuQuery.isError && <ErrorMessage>Error</ErrorMessage>}
    </section>
  );
}

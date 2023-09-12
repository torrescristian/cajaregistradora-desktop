import useCategories, { ICategoryUI } from '@/hooks/useCategories';
import useFilterMenuQuery from '@/hooks/services/useFilterMenuQuery';
import ErrorMessage from '@/components/ErrorMessage';
import Loader from '@/components/Loader';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

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
        selectedCategories.filter((sc) => sc !== categoryId),
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
  filterMenuQuery,
  disableFilter,
}: ISearchInputProps) {
  return (
    <section
      data-test="search-input"
      className="form-control flex w-full flex-row justify-start"
    >
      {!disableFilter && filterMenuQuery.isLoading && (
        <Loader className="w-2/12" />
      )}
      <input
        data-test="search-input-field"
        value={search}
        onChange={onSearch}
        type="text"
        placeholder="Buscar por nombre..."
        className="input-bordered input w-96 shadow-inner hover:border-none"
      />
      {filterMenuQuery.isError && <ErrorMessage>Error</ErrorMessage>}
    </section>
  );
}

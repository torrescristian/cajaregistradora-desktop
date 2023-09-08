import useCategories from '@/hooks/useCategories';
import useFilterMenuQuery from '@/hooks/services/useFilterMenuQuery';
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
}

export default function SearchInput({
  search,
  onSearch,
}: ISearchInputProps) {
  return (
    <section
      data-test="search-input"
      className="form-control flex flex-row justify-start"
    >
      <input
        data-test="search-input-field"
        value={search}
        onChange={onSearch}
        type="text"
        placeholder="Buscar producto..."
        className="input-bordered input w-96 shadow-inner hover:border-none"
      />
    </section>
  );
}

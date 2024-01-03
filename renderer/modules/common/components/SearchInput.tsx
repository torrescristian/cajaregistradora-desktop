import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useDebounce } from 'use-debounce';

export const useSearchProps = () => {
  const [search, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [query] = useDebounce(search, 1000);

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
    toggleSelectedCategory: handleToggleSelectedCategory,
    selectedCategories,
  };
};

interface ISearchInputProps {
  search: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function SearchInput({ search, onSearch, className }: ISearchInputProps) {
  return (
    <section
      data-test="search-input"
      className="form-control flex w-full flex-row justify-center"
    >
      <input
        data-test="search-input-field"
        value={search}
        onChange={onSearch}
        type="text"
        placeholder="Buscar por nombre..."
        className={twMerge("input-bordered input w-full shadow-inner hover:border-none", className)}
      />
    </section>
  );
}

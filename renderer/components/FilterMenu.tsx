import { IUseCategoriesResponse } from '@/hooks/useCategories';
import { ICategoryFieldPopulate } from '@/interfaces/ICategory';
import { FunnelIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

type IFilterMenuProps = Omit<IUseCategoriesResponse, 'selectedCategories'> & {
  data: ICategoryFieldPopulate[];
  toggleSelectedCategory: (categoryId: number) => void;
  selectedCategories: number[];
};

export default function FilterMenu({
  categories,
  data,
  initialize,
  selectedCategories,
  toggleSelectedCategory,
}: IFilterMenuProps) {
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    initialize(data);
  }, []);

  return (
    <section className="relative flex items-center px-2">
      <FunnelIcon
        className="h-8 w-8 text-info"
        onClick={() => setShowFilters(!showFilters)}
      />

      {showFilters && (
        <ul className="menu rounded-box absolute top-14 z-10 w-28 bg-stone-100">
          {categories.map((category) => {
            return (
              <li
                key={category.name}
                tabIndex={0}
                className="hover:bg-stone-300"
              >
                <span>{category.name}</span>
                <ul className="h-64 overflow-scroll bg-stone-100">
                  {category.subcategories.map((subcategory) => (
                    <li
                      key={subcategory.id}
                      className="form-control hover:bg-stone-300"
                    >
                      <label className="label cursor-pointer">
                        <span className="label-text">{subcategory.name}</span>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={selectedCategories.includes(subcategory.id)}
                          onChange={() =>
                            toggleSelectedCategory(subcategory.id)
                          }
                        />
                      </label>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

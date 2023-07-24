import { ICategoryUI } from '@/hooks/useCategories';
import { mergeClasses } from '@/libs/utils';

interface ISelectCategoryProps {
  subcategories: ICategoryUI[];
  handleChangeCategories: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

const SelectSubcategory = ({
  subcategories,
  handleChangeCategories,
  className,
}: ISelectCategoryProps) => {
  return (
    <select
      className={mergeClasses('select-bordered select w-full', className)}
      onChange={handleChangeCategories}
    >
      {(subcategories || []).map((subcategory) => (
        <option key={subcategory.id} value={subcategory.id}>
          {subcategory.name}
        </option>
      ))}
    </select>
  );
};

export default SelectSubcategory;

import { productTypes, PRODUCT_TYPE } from '@/interfaces/IProduct';
import { twMerge } from 'tailwind-merge';
interface IProps {
  onSelect: (type: PRODUCT_TYPE) => void;
  selectedProductType: PRODUCT_TYPE;
}
export default function ProductTypes({
  onSelect,
  selectedProductType,
}: IProps) {
  const handleSelect = (type: PRODUCT_TYPE) => () => {
    onSelect(type === selectedProductType ? '' : type);
  };

  return (
    <section className="flex flex-row gap-5">
      {productTypes
        .filter((t) => t)
        .map((type: PRODUCT_TYPE) => (
          <div
            className={twMerge(
              'flex flex-row items-center gap-2 btn btn-outline btn-accent',
              selectedProductType === type ? 'btn-active' : '',
            )}
            key={type}
            onClick={handleSelect(type)}
          >
            <span>{type}</span>
          </div>
        ))}
    </section>
  );
}

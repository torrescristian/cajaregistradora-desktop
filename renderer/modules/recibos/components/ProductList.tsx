import { IProduct } from '@/modules/products/interfaces/IProduct';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export function ProductList({ products }: { products: IProduct[] }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeOpen = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapse bg-base-200">
      <input
        type="checkbox"
        value={String(isOpen)}
        onChange={handleChangeOpen}
      />
      <div className="collapse-title flex flex-row items-center gap-3">
        {isOpen ? (
          <ChevronUpIcon className="w-5 h-5" />
        ) : (
          <ChevronDownIcon className="w-5 h-5" />
        )}{' '}
        Ver productos
      </div>
      <ul className="collapse-content">
        {products?.map((p: IProduct) => (
          <li key={p?.id!}>
            {p?.type?.emoji} {p?.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

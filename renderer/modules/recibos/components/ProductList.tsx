import { IPromoItem } from '@/modules/cart/interfaces/ICart';
import { RenderIf } from '@/modules/common/components/RenderIf';
import { IOrderItem } from '@/modules/ordenes/interfaces/IOrder';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

interface IProps {
  items: IOrderItem[];
  promos?: IPromoItem[];
}

export function ProductList({ items, promos }: IProps) {
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
        {items?.map((i, index) => (
          <li key={index}>
            <p>
              {i.product?.type?.emoji} {i.product?.name}
            </p>
            <p className="text-end">
              {i.quantity} &times; {i.selectedVariant?.name}
            </p>
          </li>
        ))}
        <RenderIf condition={promos?.length}>
          <div className="divider">Promos</div>
          {promos?.map(({ promo }, index) => (
            <li key={index}>
              <p>{promo.name}</p>
              {promo.variants?.map(({ variant }) => (
                <p>
                  {variant.product?.name} {variant.name}
                </p>
              ))}
            </li>
          ))}
        </RenderIf>
      </ul>
    </div>
  );
}

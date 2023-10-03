import { IPromo } from '@/interfaces/IPromo';
import { formatPrice } from '@/libs/utils';

interface IProps {
  promos: IPromo[];
}

export default function RenderPromos({ promos }: IProps) {
  return (
    <div className="flex flex-row gap-3 overflow-x-scroll p-5">
      {promos.map((promo) => (
        <div
          className="flex flex-col p-4 items-center border-2"
          key={promo.id!}
        >
          <p className="text-xl font-bold">{promo.name}</p>
          <p className="text-xl">{formatPrice(promo.price)}</p>
          <div className="flex flex-col justify-between p-4 gap-5">
            <div className="w-full shadow-2xl p-4">
              {promo.categories.map(({ category, quantity }) => (
                <div key={category.id} className="flex flex-col gap-4">
                  <p className="text-2xl list-item">{category.name}</p>
                  {category.variants.map((variant) => (
                    <div key={variant.id} className="whitespace-nowrap">
                      <p>
                        {variant.product} - {variant.name}:{' '}
                        {formatPrice(variant.price)}
                      </p>
                      <p>Cantidad: {quantity}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="w-full p-4 shadow-2xl">
              {promo.variants.map(({ variant, quantity }) => (
                <div key={variant.id} className="whitespace-nowrap">
                  <p className="list-item">
                    {variant.product} - {variant.name} :{' '}
                    {formatPrice(variant.price)}
                  </p>
                  <p>Cantidad: {quantity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

import { IPromo } from '@/interfaces/IPromo';
import { formatPrice } from '@/libs/utils';

interface IProps {
  promos: IPromo[];
}

export default function RenderPromos({ promos }: IProps) {
  return (
    <div className="flex flex-row border-2 gap-3 overflow-x-scroll">
      {promos.map((promo) => (
        <div className="flex flex-col items-center bg-blue-600" key={promo.id!}>
          <p>{promo.name}</p>
          <p>{formatPrice(promo.price)}</p>
          <div className="flex flex-row justify-between">
            <div className="w-full bg-slate-600">
              {promo.categories.map((category) => (
                <div key={category.id}>
                  <p className="text-xl">{category.name}</p>
                  {category.variants.map((variant) => (
                    <div key={variant.id}>
                      <p>
                        {variant.product} - {variant.name}
                      </p>
                      <p>${variant.price}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="w-full bg-orange-700">
              {promo.variants.map((variant) => (
                <div key={variant.id}>
                  <p>
                    {variant.product}-{variant.name}
                  </p>
                  <p>${variant.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

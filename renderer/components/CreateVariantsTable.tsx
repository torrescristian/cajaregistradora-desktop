import { IVariant, PRODUCT_TYPE } from '@/interfaces/IProduct';
import { formatPrice } from '@/libs/utils';

interface IProps {
  selectedType: PRODUCT_TYPE;
  isService: boolean;
}

export default function CreateVariantsTable({
  selectedType,
  isService,
}: IProps) {
  return (
    <div className="overflow-x-auto w-full justify-center flex">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Variante inicial</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {getVariantsByProductType(selectedType).map(
            ({ name, price, stock }) => (
              <tr key={name}>
                <td>
                  <input type="radio" className="input radio" />
                </td>
                <td>
                  <input value={name} className="input input-bordered" />
                </td>
                <td>
                  <input className="input input-bordered" />
                </td>
                <td>
                  {isService ? (
                    <input className="input input-bordered" />
                  ) : (
                    'Sin control de stock'
                  )}
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}

interface IFakeVariant {
  name: string;
  price: number;
  stock: number;
}

function getVariantsByProductType(productType: PRODUCT_TYPE): IFakeVariant[] {
  switch (productType) {
    case 'PIZZA': {
      return [
        {
          name: 'Completa',
          price: 0,
          stock: 0,
        },
        {
          name: 'Media',
          price: 0,
          stock: 0,
        },
        {
          name: 'Porción',
          price: 0,
          stock: 0,
        },
      ];
    }
    case 'SODA': {
      return [
        {
          name: '1 Lts',
          price: 0,
          stock: 0,
        },
        {
          name: '500 ml',
          price: 0,
          stock: 0,
        },
        {
          name: '1.25 Lts',
          price: 0,
          stock: 0,
        },
      ];
    }
    default: {
      return [];
    }
  }
}

import { IVariantPayload } from '@/interfaces/IVariants';
import { MinusIcon } from '@heroicons/react/24/solid';
import { RenderIf } from './RenderIf';
import { IProductType } from '@/interfaces/IProduct';

interface IProps {

  isService: boolean;
  setVariants: (variants: IVariantPayload[]) => void;
  variants: IVariantPayload[];
  onChange: (defaultVariantIndex: number) => void;
  defaultVariantIndex: number;
}

export default function CreateVariantsTable({
  isService,
  variants,
  setVariants,
  onChange,
  defaultVariantIndex,
}: IProps) {
  const handleChangeDefaultVariant =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(index);
    };

  const handleChangeVariantName =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVariants = [...variants];
      newVariants[index].name = e.target.value;
      setVariants(newVariants);
    };

  const handleChangeVariantPrice =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVariants = [...variants];
      const newValue = Number(e.target.value);
      if (isNaN(newValue) && e.target.value !== '') return;
      newVariants[index].price = newValue;
      setVariants(newVariants);
    };

  const handleChangeVariantStock =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVariants = [...variants];
      const newStock = Number(e.target.value);
      if (isNaN(newStock) && e.target.value !== '') return;
      newVariants[index].stock_per_variant = newStock;
      setVariants(newVariants);
    };

  const handleChangeMinimumStock =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVariants = [...variants];
      const newStockMin = Number(e.target.value);
      if (isNaN(newStockMin) && e.target.value !== '') return;
      newVariants[index].minimum_stock = newStockMin;
      setVariants(newVariants);
    };

  const handleClickAddVariant = (e: any) => {
    e.preventDefault();
    const newVariants = [...variants];
    newVariants.push({
      name: '',
      price: 0,
      stock_per_variant: 0,
      product: 0,
      minimum_stock: 0,
    });
    setVariants(newVariants);
  };

  const handleClickRemoveVariant = (indexToRemove: number) => {
    const newVariants = [...variants];
    newVariants.splice(indexToRemove, 1);
    setVariants(newVariants);
  };

  return (
    <div className="overflow-x-auto w-full justify-center flex flex-col items-center gap-4 p-4">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Variante inicial</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <RenderIf condition={isService}>{''}</RenderIf>
            <RenderIf condition={!isService}>
              <th>Alerta de stock faltante</th>
            </RenderIf>
          </tr>
        </thead>
        <tbody>
          {variants.map(
            (
              { name, price, product, stock_per_variant, minimum_stock },
              index,
            ) => (
              <tr key={index}>
                <td>
                  <input
                    type="radio"
                    className="input radio w-3"
                    onChange={handleChangeDefaultVariant(index)}
                    checked={index === defaultVariantIndex}
                  />
                </td>
                <td>
                  <input
                    value={name}
                    className="input input-bordered w-44"
                    onChange={handleChangeVariantName(index)}
                  />
                </td>
                <td>
                  <input
                    className="input input-bordered w-32"
                    type="number"
                    value={price}
                    onChange={handleChangeVariantPrice(index)}
                  />
                </td>
                <td>
                  {isService ? (
                    'Sin control de stock'
                  ) : (
                    <input
                      className="input input-bordered w-32"
                      value={stock_per_variant}
                      onChange={handleChangeVariantStock(index)}
                    />
                  )}
                </td>
                <RenderIf condition={!isService}>
                  <td>
                    <input
                      className="input input-bordered w-32"
                      value={minimum_stock}
                      onChange={handleChangeMinimumStock(index)}
                    />
                  </td>
                </RenderIf>
                <td>
                  <button
                    className="btn btn-error text-stone-50"
                    onClick={() => handleClickRemoveVariant(index)}
                  >
                    <MinusIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
      <button
        className="btn btn-info text-slate-50 w-max"
        onClick={handleClickAddVariant}
      >
        Agregar Variante
      </button>
    </div>
  );
}

import FieldLabel from '@/components/FieldLabel';
import useUpdateVariantPriceMutation from '@/hooks/services/useUpdateVariantPriceMutation';
import { IVariantExpanded } from '@/interfaces/IVariants';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

interface IProps {
  variants: IVariantExpanded[];
}

export const ButtomUpdatePrice = ({ variants }: IProps) => {
  const ref = useRef<HTMLDialogElement>(null);
  const [fixedPrice, setFixedPrice] = useState<number | null>(null);
  const [percentage, setPercentage] = useState<number | null>(null);
  const [variantPrice, setVariantPrice] = useState<number | null>(null);

  const updateVariantPriceMutation = useUpdateVariantPriceMutation();

  const handleFixedPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFixedPrice(Number(event.target.value));
  };

  const handlePercentageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPercentage(Number(event.target.value));
  };

  const handleVariantPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setVariantPrice(Number(event.target.value));
  };

  const handleCloseModal = (e: React.MouseEvent) => {
    e.preventDefault();
    ref.current?.close();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log({ variants });
    try {
      if (fixedPrice !== null) {
        variants.map((variant) => {
          updateVariantPriceMutation.mutate({
            newPrice: variant.price + fixedPrice,
            variant,
          });
        });
      }

      if (percentage !== null) {
        variants.map((variant) => {
          updateVariantPriceMutation.mutate({
            newPrice: variant.price + (variant.price * percentage) / 100,
            variant,
          });
        });
      }

      if (variantPrice !== null) {
        variants.forEach((variant) => {
          updateVariantPriceMutation.mutate({
            newPrice: variantPrice,
            variant: variant,
          });
        });
      }

      toast.success('Precio actualizado 🤩');
      ref.current?.close();
    } catch (error) {
      toast.error('Ocurrio un error al actualizar los precios. 😔');
    }
  };

  return (
    <section className="w-min whitespace-nowrap">
      <button
        className="btn btn-primary"
        onClick={() => ref.current?.showModal()}
      >
        Actualizar precio
      </button>
      <dialog ref={ref} className="bg-neutral p-5 w-[50vw] shadow-lg">
        <form className="flex flex-col gap-8 items-center  ">
          <p className="text-xl font-bold ">
            Actualizar el precio de las variantes seleccionadas
          </p>
          <FieldLabel
            title="Porcentaje"
            className="items-center gap-3 text-2xl"
            columnMode
          >
            <label className="input-group ">
              <span>%</span>
              <input
                type="number"
                className="input input-bordered"
                onChange={handlePercentageChange}
              />
            </label>
          </FieldLabel>
          <FieldLabel
            title="Fijo"
            className="items-center gap-3 text-2xl"
            columnMode
          >
            <label className="input-group">
              <span>$</span>
              <input
                type="number"
                className="input input-bordered"
                onChange={handleFixedPriceChange}
              />
            </label>
          </FieldLabel>
          <FieldLabel
            title="Subir todas las variantes"
            className="items-center gap-3 text-2xl"
            columnMode
          >
            <label className="input-group">
              <span>🧺</span>
              <input
                type="number"
                className="input input-bordered"
                onChange={handleVariantPriceChange}
              />
            </label>
          </FieldLabel>
          <div className="flex flex-row w-full gap-5 justify-end">
            <button
              className="btn btn-error btn-link text-error"
              onClick={handleCloseModal}
            >
              Cancelar
            </button>
            <button
              className="btn btn-success text-neutral-content"
              onClick={handleClick}
            >
              Actualizar
            </button>
          </div>
        </form>
      </dialog>
    </section>
  );
};

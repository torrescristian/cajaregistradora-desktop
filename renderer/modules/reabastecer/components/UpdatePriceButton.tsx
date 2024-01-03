import FieldLabel from '@/modules/common/components/FieldLabel';
import useUpdateVariantPriceMutation from '@/modules/reabastecer/hooks/useUpdateVariantPriceMutation';
import { IVariantExpanded } from '@/modules/common/interfaces/IVariants';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { ButtonClose } from '@/modules/common/components/ButtonClose';
import { DISCOUNT_TYPE } from '@/modules/ordenes/interfaces/IOrder';
import { RenderIf } from '@/modules/common/components/RenderIf';
import { VARIANTS_KEY } from '@/modules/common/consts';
import { useQueryClient } from '@tanstack/react-query';
import { PRODUCTS_KEY } from '@/modules/common/consts';
interface IProps {
  variants: IVariantExpanded[];
}

export const UpdatePriceButton = ({ variants }: IProps) => {
  const ref = useRef<HTMLDialogElement>(null);
  const [fixedPrice, setFixedPrice] = useState<number | null>(null);
  const [percentage, setPercentage] = useState<number | null>(null);
  const [type, setType] = useState(DISCOUNT_TYPE.FIXED);
  const queryClient = useQueryClient();

  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value as DISCOUNT_TYPE);
  };

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

  const handleCloseModal = (e: React.MouseEvent) => {
    e.preventDefault();
    ref.current?.close();
  };

  const handleClickUpdate = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      let promises: Promise<any>[] = [];
      if (fixedPrice !== null) {
        const res = variants.map((variant) =>
          updateVariantPriceMutation.mutateAsync({
            newPrice: variant.price + fixedPrice,
            variant,
          }),
        );
        promises = [...promises, ...res];
      }

      if (percentage !== null) {
        const res = variants.map((variant) =>
          updateVariantPriceMutation.mutateAsync({
            newPrice: variant.price + (variant.price * percentage) / 100,
            variant,
          }),
        );
        promises = [...promises, ...res];
      }

      await Promise.all(promises);
      ref.current?.close();
      await queryClient.invalidateQueries([VARIANTS_KEY, PRODUCTS_KEY]);
    } catch (error) {
      console.log({ error });
      toast.error(
        'Ocurrio un error al actualizar los precios! Comunicate con nosotros',
      );
    }
  };

  return (
    <section className="w-min whitespace-nowrap">
      <button
        className="btn btn-primary"
        onClick={() => ref.current?.showModal()}
      >
        Operaciones en lote
      </button>
      <dialog ref={ref} className="bg-base-100 p-5 shadow-lg">
        <p className="text-xl font-bold w-80 whitespace-pre-wrap text-center mb-5">
          Actualizar precios en productos seleccionados
        </p>
        <form className="flex flex-col gap-8 items-center">
          <section className="flex flex-row w-full">
            <FieldLabel
              title="Fijo $"
              className="label w-full border-2 hover:link p-3 border-stone-500"
            >
              <input
                type="radio"
                name="radio-1"
                className="radio"
                onChange={handleChangeType}
                value={DISCOUNT_TYPE.FIXED}
                checked={type === DISCOUNT_TYPE.FIXED}
              />
            </FieldLabel>
            <FieldLabel
              title="Porcentaje %"
              className="label border-2 whitespace-nowrap hover:link p-3  border-stone-500"
            >
              <input
                type="radio"
                name="radio-1"
                value={DISCOUNT_TYPE.PERC}
                className="radio"
                onChange={handleChangeType}
                checked={type === DISCOUNT_TYPE.PERC}
              />
            </FieldLabel>
          </section>
          <RenderIf condition={type === DISCOUNT_TYPE.PERC}>
            <label className="input-group ">
              <input
                type="number"
                className="input input-bordered"
                onChange={handlePercentageChange}
              />
              <span>%</span>
            </label>
          </RenderIf>
          <RenderIf condition={type === DISCOUNT_TYPE.FIXED}>
            <label className="input-group">
              <span>$</span>
              <input
                type="number"
                className="input input-bordered"
                onChange={handleFixedPriceChange}
              />
            </label>
          </RenderIf>
          <div className="flex flex-row">
            <ButtonClose label="Cerrar" onClick={handleCloseModal} />
            <button
              className="btn btn-success text-base-content"
              onClick={handleClickUpdate}
            >
              Actualizar
            </button>
          </div>
        </form>
      </dialog>
    </section>
  );
};

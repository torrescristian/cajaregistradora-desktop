import FieldLabel from '@/modules/common/components/FieldLabel';
import useUpdateVariantPriceMutation from '@/modules/reabastecer/hooks/useUpdateVariantPriceMutation';
import { IVariantExpanded } from '@/modules/common/interfaces/IVariants';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { DISCOUNT_TYPE } from '@/modules/ordenes/interfaces/IOrder';
import { RenderIf } from '@/modules/common/components/RenderIf';
import { VARIANTS_KEY } from '@/modules/common/consts';
import { useQueryClient } from '@tanstack/react-query';

interface IProps {
  variants: IVariantExpanded[];
}

export const BatchPriceSection = ({ variants }: IProps) => {
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
      await queryClient.invalidateQueries([VARIANTS_KEY]);
      window.location.reload()
    } catch (error) {
      console.log({ error });
      toast.error(
        'Ocurrio un error al actualizar los precios! Comunicate con nosotros',
      );
    }
  };

  return (
    <section className="w-full whitespace-nowrap flex flex-col items-center">
      <p className="text-xl font-bold whitespace-nowrap text-center mb-5">
        Actualizar precios de productos seleccionados
      </p>
      <form className="flex flex-row gap-8 justify-center items-center w-fit">
        <section className="flex flex-row">
          <FieldLabel
            title="Cant. Fija $"
            className="label w-full border-2 hover:link p-3 border-stone-500 gap-3"
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
            className="label border-2 whitespace-nowrap hover:link p-3  border-stone-500 gap-3"
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
              className="input input-bordered text-right"
              onChange={handlePercentageChange}
            />
            <span>%</span>
          </label>
        </RenderIf>
        <RenderIf condition={type === DISCOUNT_TYPE.FIXED}>
          <label className="input-group">
            <span>$</span>
            <input
              className="input input-bordered"
              onChange={handleFixedPriceChange}
            />
          </label>
        </RenderIf>
        <div className="flex flex-row">
          <button
            className="btn btn-success text-base-content"
            onClick={handleClickUpdate}
          >
            Actualizar
          </button>
        </div>
      </form>
    </section>
  );
};

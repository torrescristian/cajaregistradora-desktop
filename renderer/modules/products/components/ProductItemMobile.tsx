import HighlightedText from '@/modules/common/components/HighlightedText';
import { IProduct, MEASURE_UNIT } from '../interfaces/IProduct';
import { RenderIf } from '@/modules/common/components/RenderIf';
import { Selector } from '@/modules/common/components/Selector';
import useProductItem from '../hooks/useProductItem';
import { formatPrice, getUrlFromImage } from '@/modules/common/libs/utils';
import {
  AddProductButton,
  RemoveProductButton,
} from '@/modules/cart/components/ProductItem.styles';
import { IVariantPromo } from '@/modules/common/interfaces/IVariants';
import { ChangeEvent, useState } from 'react';

interface IProps {
  product: IProduct;
  onClick?: (props: { product: IProduct; variant: IVariantPromo }) => void;
}

export const ProductItemMobile = ({ product, onClick }: IProps) => {
  const {
    cartItemQuantity,
    setItemQuantity,
    handleChangeVariant,
    handleClick,
    handleClickAdd,
    handleClickRemove,
    selectedVariant,
  } = useProductItem({ product, onClick });
  const [quantity, setQuantity] = useState<string>(String(cartItemQuantity));

  const handleClickSetQuantity = () => {
    setItemQuantity(Number(quantity));
  };

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value === '' ? '' : e.target.value);
  };

  return (
    <div className="flex flex-col w-full mt-3 border-2 p-5">
      <HighlightedText>{product.name}</HighlightedText>

      <div className="flex flex-row w-full gap-3 justify-between">
        <div className="tooltip w-96" data-tip={product.description}>
          <img src={product.image} className="w-32" />
        </div>
        <div className="flex flex-col w-full items-end">
          <RenderIf condition={product.variants.length}>
            <Selector
              onChange={handleChangeVariant}
              defaultValue={product.default_variant.name}
              values={product.variants.map((variant) => ({
                label: variant.name,
                value: variant.name,
              }))}
            />
          </RenderIf>
          <p className="my-3">{formatPrice(selectedVariant.price)}</p>
          <RenderIf condition={product.measureUnit === MEASURE_UNIT.KILOGRAM}>
            <div className="flex flex-row">
              <input
                className="input w-32 input-bordered text-right"
                value={quantity}
                onChange={handleChangeQuantity}
              />
              <button
                className="btn btn-primary w-min rounded-lg"
                onClick={handleClickSetQuantity}
                data-test="add-product"
              >
                Agregar
              </button>
            </div>
          </RenderIf>
          <RenderIf
            condition={
              !product.measureUnit || product.measureUnit === MEASURE_UNIT.UNIT
            }
          >
            {cartItemQuantity > 0 ? (
              <div className="flex flex-row gap-2 w-min items-center">
                <RemoveProductButton onClick={handleClickRemove} />
                <p>&times;{cartItemQuantity}</p>
                <AddProductButton onClick={handleClickAdd} />
              </div>
            ) : (
              <button
                className="btn btn-primary w-min rounded-lg"
                onClick={handleClick}
                data-test="add-product"
              >
                Agregar
              </button>
            )}
          </RenderIf>
        </div>
      </div>
    </div>
  );
};

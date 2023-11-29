import HighlightedText from '@/modules/common/components/HighlightedText';
import { IProduct } from '../interfaces/IProduct';
import { RenderIf } from '@/modules/common/components/RenderIf';
import { Selector } from '@/modules/common/components/Selector';
import useProductItem from '../hooks/useProductItem';
import { formatPrice } from '@/modules/common/libs/utils';
import {
  AddProductButton,
  RemoveProductButton,
} from '@/modules/cart/components/ProductItem.styles';
import { IVariantPromo } from '@/modules/common/interfaces/IVariants';

interface IProps {
  product: IProduct;
  onClick?: (props: { product: IProduct; variant: IVariantPromo }) => void;
}

export const ProductItemMobile = ({ product, onClick }: IProps) => {
  const {
    handleChangeVariant,
    handleClick,
    selectedVariant,
    cartItemQuantity,
    handleClickRemove,
    handleClickAdd,
  } = useProductItem({ product, onClick });

  return (
    <div className="flex flex-col md:w-1/5 w-full mt-3 border-2 p-4">
      <HighlightedText>{product.name}</HighlightedText>
      <div className="flex flex-row w-full gap-3 items-center text-right">
        <img src={product.image} className="w-1/2" />
        <div className="flex flex-col w-full justify-between ">
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

          {cartItemQuantity > 0 ? (
            <div className="flex flex-row gap-3 w-full justify-end items-center">
              <RemoveProductButton onClick={handleClickRemove} />
              <p>&times;{cartItemQuantity}</p>
              <AddProductButton onClick={handleClickAdd} />
            </div>
          ) : (
            <button
              className="btn btn-primary w-full rounded-lg"
              onClick={handleClick}
              data-test="add-product"
            >
              Agregar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

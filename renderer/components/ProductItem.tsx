import {
  ICollapseTitle,
  IComponent,
} from '@/interfaces/ProductItem.interfaces';
import useProductItem from '@/hooks/useProductItem';
import { formatPrice } from '@/libs/utils';
import { useState } from 'react';
import { Card } from './Card';
import { Selector } from './Selector';
import { IProduct, IVariant } from '@/interfaces/IProduct';

const Text = ({ children }: IComponent) => {
  return (
    <p className="font-bold text-xl rounded-lg whitespace-nowrap text-center text-base-content ">
      {children}
    </p>
  );
};

const HighlightedText = ({ children }: IComponent) => {
  return (
    <p
      className="font-bold text-xl text-base-content rounded-lg p-2 whitespace-nowrap text-center gap-2 "
      style={{
        background: 'rgba(0,0,0,0.3)',
      }}
    >
      {children}
    </p>
  );
};
interface IProps {
  product: IProduct;
  onClick?: (props: { product: IProduct; variant: IVariant }) => void;
}
const ProductItem = ({ product, onClick }: IProps) => {
  const [selectedVariant, setSelectedVariant] = useState(
    product.default_variant,
  );

  const { handleClickAdd, isService } = useProductItem({
    product,
    selectedVariant,
  });

  const handleChangeVariant = (e: any) => {
    product.variants.map((variant) => {
      if (variant.name === e.target.value) {
        setSelectedVariant(variant);
      }
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (onClick) {
      onClick({ product, variant: selectedVariant });
      console.table({ product, selectedVariant });
      return;
    }

    handleClickAdd();
  };

  return (
    <Card data-test="productItem" tabIndex={0}>
      <section
        data-test="productItem.collapse.title.left"
        className="flex flex-1 items-center w-72 text-primary-content"
      >
        <div className="flex flex-col w-full gap-2">
          <HighlightedText>{product.name}</HighlightedText>
          <div className="flex flex-row">
            <img src={product.image} className="w-1/2" />
            <div className="flex flex-col items-center justify-around w-1/2 ">
              <Selector
                onChange={handleChangeVariant}
                defaultValue={product.default_variant.name}
                values={product.variants.map((variant) => ({
                  label: variant.name,
                  value: variant.name,
                }))}
              />
              <HighlightedText>
                {formatPrice(selectedVariant.price)}
              </HighlightedText>
            </div>
          </div>

          <section className="flex w-full justify-around items-center">
            <Text>
              {product.isService ? (
                <span className="text-5xl">∞</span>
              ) : (
                selectedVariant.stock_per_variant.stock + ' unid'
              )}
            </Text>
            <button
              className="btn btn-primary w-fit px-10 rounded-lg"
              onClick={handleClick}
            >
              Agregar
            </button>
          </section>
        </div>
      </section>
      <section
        data-test="productItem.collapse.title.right"
        className="form-control flex flex-row items-center justify-end gap-x-1"
      ></section>
    </Card>
  );
};

export default ProductItem;

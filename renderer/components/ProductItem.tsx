import {
  ICollapseTitle,
  IComponent,
} from '@/interfaces/ProductItem.interfaces';
import useProductItem from '@/hooks/useProductItem';
import { formatPrice } from '@/libs/utils';
import { useState } from 'react';
import { Card } from './Card';

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

const ProductItem = ({ product }: ICollapseTitle) => {
  const [selectedVariant, setSelectedVariant] = useState(
    product.default_variant,
  );

  const { disabled, handleClickAdd, isService } = useProductItem({
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

  return (
    <Card
      data-test="productItem"
      tabIndex={0}
  
    >
      <section
        data-test="productItem.collapse.title.left"
        className="flex flex-1 items-center w-72 text-primary-content"
      >
        <div className="flex flex-col w-full gap-2">
          <HighlightedText>{product.name}</HighlightedText>
          <div className="flex flex-row">
            <img src={product.image} className="w-1/2" />
            <div className="flex flex-col items-center justify-around w-1/2 ">
              <select
                className="select select-bordered text-base-content"
                onChange={handleChangeVariant}
                defaultValue={product.default_variant.name}
              >
                {product.variants.map((variant) => (
                  <option value={variant.name}>{variant.name}</option>
                ))}
              </select>
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
              onClick={handleClickAdd}
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

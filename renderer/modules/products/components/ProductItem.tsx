import { IComponent } from '@/modules/common/interfaces/ProductItem.interfaces';
import useProductItem from '@/modules/products/hooks/useProductItem';
import { formatPrice } from '@/modules/common/libs/utils';
import { useState } from 'react';
import { Card } from '@/modules/common/components/Card';
import { Selector } from '@/modules/common/components/Selector';
import { IProduct } from '@/modules/products/interfaces/IProduct';
import { RenderIf } from '@/modules/common/components/RenderIf';
import { IVariantPromo } from '@/modules/common/interfaces/IVariants';
import HighlightedText from '@/modules/common/components/HighlightedText';

const Text = ({ children }: IComponent) => {
  return (
    <p className="font-bold text-xl rounded-lg whitespace-nowrap text-center text-base-content ">
      {children}
    </p>
  );
};

interface IProps {
  product: IProduct;
  onClick?: (props: { product: IProduct; variant: IVariantPromo }) => void;
}
const ProductItem = ({ product, onClick }: IProps) => {
  const { handleChangeVariant, selectedVariant, handleClick } = useProductItem({
    product,
    onClick,
  });

  return (
    <Card data-test="product-item" tabIndex={0}>
      <section className="flex flex-1 items-center w-72 text-primary-content">
        <div className="flex flex-col w-full gap-5 justify-between">
          <HighlightedText>{product.name}</HighlightedText>

          <div className="flex flex-row h-32 items-center">
            <img src={product.image} className="w-1/2 h-36" />
            <div className="flex flex-col items-center justify-around w-1/2 ">
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
                selectedVariant.stock_per_variant?.stock + ' unid'
              )}
            </Text>
            <button
              className="btn btn-primary w-fit px-10 rounded-lg"
              onClick={handleClick}
              data-test="add-product"
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

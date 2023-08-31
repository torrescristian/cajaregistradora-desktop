import {
  ICollapseTitle,
  IComponent,
} from '@/interfaces/ProductItem.interfaces';
import useProductItem from '@/hooks/useProductItem';
import { Badge } from './ProductItem.styles';
import { formatPrice } from '@/libs/utils';

const HighlightedText = ({ children }: IComponent) => {
  return (
    <p
      className="  font-bold text-2xl rounded-lg px-2 whitespace-nowrap text-center "
      style={{
        background: 'rgba(0,0,0,0.3)',
      }}
    >
      {children}
    </p>
  );
};

const ProductItem = ({ product }: ICollapseTitle) => {
  const { disabled, handleClickAdd, isService } = useProductItem(product);

  return (
    <section
      data-test="productItem"
      tabIndex={0}
      className="flex flex-col relative w-72 p-8 rounded-3xl items-center bg-image border-4 border-white
      hover:border-green-400
      "
      style={{
        backgroundImage: `url(${product.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={handleClickAdd}
    >
      {isService ? null : (
        <Badge className="absolute top-3 right-3">
          {product.defaultVariant.stockPerVariant.stock}
        </Badge>
      )}

      <section
        data-test="productItem.collapse.title.left"
        className="flex flex-1 items-center text-primary-content"
      >
        <div className="flex flex-col gap-4 text-white">
          <HighlightedText>{product.name}</HighlightedText>
          <HighlightedText>
            {formatPrice(product.defaultVariant.price)}
          </HighlightedText>
        </div>
      </section>
      <section
        data-test="productItem.collapse.title.right"
        className="form-control flex flex-row items-center justify-end gap-x-1"
      ></section>
    </section>
  );
};

export default ProductItem;

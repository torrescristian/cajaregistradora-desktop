import {
  ICollapseTitle,
  IComponent,
} from '@/interfaces/ProductItem.interfaces';
import useProductItem from '@/hooks/useProductItem';
import { Badge } from './ProductItem.styles';
import { formatPrice } from '@/libs/utils';

const Text = ({ children }: IComponent) => {
  return (
    <p
      className="font-bold text-xl rounded-lg whitespace-nowrap text-center "
    >
      {children}
    </p>
  );
};

const HighlightedText = ({ children }: IComponent) => {
  return (
    <p
      className="font-bold text-xl rounded-lg p-5 whitespace-nowrap text-center "
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
      className="flex flex-col relative p-3 rounded-3xl items-center shadow-md shadow-white hover:border-green-400"
    >
      {isService ? null : (
        <Badge className="absolute top-3 right-3">
          {product.default_variant.stock_per_variant.stock}
        </Badge>
      )}

      <section
        data-test="productItem.collapse.title.left"
        className="flex flex-1 items-center w-72 text-primary-content"
      >
        <div className="flex flex-col w-full gap-2 text-white">
            <HighlightedText>{product.name}</HighlightedText>
          <div className='flex flex-col items-center'>
            <img src={product.image} />
          </div>
          <HighlightedText>
            {formatPrice(product.default_variant.price)}
          </HighlightedText>
            <select className='select w-full select-bordered'>
              {product.variants.map((variant) => (
                <option value={variant.name}>{variant.name}</option>
              ))}
            </select>
          <section className='flex w-full justify-around items-center'>
          <Text>{product.default_variant.stock_per_variant.stock ? product.default_variant.stock_per_variant.stock + ' unid' : 'Sin stock'}</Text>
          <button className='btn btn-success text-stone-50 w-fit px-10 rounded-lg' onClick={handleClickAdd}>Agregar</button>

          </section>
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

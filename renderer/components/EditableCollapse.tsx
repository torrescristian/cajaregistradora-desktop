import { mergeClasses } from '@/libs/utils';
import Loader from '@/components/Loader';
import useUpdateProductForm from '@/hooks/useUpdateProduct';
import { ICollapseTitle } from '@/interfaces/ProductItem.interfaces';
import {
  CollapseContent,
  CollapseTitle,
  UpdateProductButton,
} from './ProductItem.styles';
import FormControl from './FormControl';

const EditableCollapse = ({ product}: ICollapseTitle) => {
  const {
    isError,
    isLoading,
    error,
    stock,
    name,
    pendingChanges,
    handleChangeStock,
    handleChangeName,
    handleSubmit,
  } = useUpdateProductForm({ product });

  return (
    <section
      data-test="productItem"
      tabIndex={0}
      className={mergeClasses(
        'collapse items-center rounded-3xl shadow-md',
        pendingChanges ? 'collapse-open' : '',
      )}
    >
      <CollapseTitle>
        <section className="flex w-full flex-col gap-3">
          <p className="font-bold">{product.name}</p>
          <FormControl
            text="Nombre"
            name="name"
            type="text"
            value={name}
            onChange={handleChangeName}
            fullWidth
            disabled={isLoading}
          />
          <section className="flex flex-row justify-around gap-x-3">
            <FormControl
              text="Precio"
              suffix="$"
              name="price"
              type="number"
              // TODO: fix
              // value={price}
              value="-"
              // onChange={handleChangePrice}
              onChange={() => {}}
              // disabled={isLoading}
              disabled
              fullWidth={product.isService ? true : false}
            />
            {product.isService ? null : (
              <FormControl
                text="Stock"
                name="stock"
                type="number"
                value={stock}
                onChange={handleChangeStock}
                disabled={isLoading}
              />
            )}
          </section>
        </section>
      </CollapseTitle>
      {pendingChanges ? (
        <CollapseContent>
          <section
            data-test="productItem.collapse.title.right"
            className="form-control flex w-full flex-row items-center justify-end gap-x-1"
          >
            {isLoading ? <Loader /> : null}
            {isError ? (
              <p className="text-red-500">
                {(error as any)?.message || 'Error'}
              </p>
            ) : null}
            {isLoading ? null : (
              <UpdateProductButton
                pendingChanges={pendingChanges}
                onClick={handleSubmit}
              />
            )}
          </section>
        </CollapseContent>
      ) : null}
    </section>
  );
};

export default EditableCollapse;

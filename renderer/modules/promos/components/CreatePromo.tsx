import { RenderIf } from '@/modules/common/components/RenderIf';
import ProductItem from '@/modules/products/components/ProductItem';
import SearchInput from '@/modules/common/components/SearchInput';
import { PlusIcon } from '@heroicons/react/24/solid';
import CardVariantList from './CardVariantList';
import CardCategoryList from './CardCategoryList';
import SubmitButton from '@/modules/common/components/SubmitButton';
import FieldLabel from '@/modules/common/components/FieldLabel';
import useCreatePromo from '../hooks/useCreatePromo';

export const CreatePromo = () => {
  const {
    handleCreatePromo,
    handleChangeName,
    name,
    price,
    handleChangePrice,
    categories,
    handleChangeSelectedCategory,
    selectedCategory,
    handleClickAddCategory,
    selectedCategoryList,
    setSelectedCategoryList,
    incrementCategoryByOne,
    searchProps,
    handleClickAddProduct,
    products,
    selectedVariantList,
    setSelectedVariantList,
    createPromoMutation,
  } = useCreatePromo();

  return (
    <section className="flex flex-col">
      <div className="flex flex-col gap-3 items-center p-3">
        <form
          className="flex flex-col p-5 gap-7 items-start"
          onSubmit={handleCreatePromo}
        >
          <div className="flex flex-row gap-5  justify-start items-end p-5">
            <FieldLabel title="Nombre:" className="flex flex-col">
              <input
                type="text"
                className="input input-bordered "
                value={name}
                onChange={handleChangeName}
              />
            </FieldLabel>
            <FieldLabel title="Precio:" className="flex flex-col">
              <input
                type="number"
                className="input input-bordered w-36"
                value={price}
                onChange={handleChangePrice}
              />
            </FieldLabel>
            <RenderIf condition={categories?.length}>
              <div className="flex flex-row items-end">
                <FieldLabel title="Categorias:" className="flex flex-col">
                  <select
                    className="select select-bordered "
                    onChange={handleChangeSelectedCategory}
                    value={selectedCategory?.id}
                    defaultValue={0}
                  >
                    <option value={0}>Seleccione una categoria</option>
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </FieldLabel>
                <button
                  className="btn btn-primary"
                  onClick={handleClickAddCategory}
                >
                  <PlusIcon className="w-9 h-9" /> Agregar
                </button>
              </div>
            </RenderIf>
          </div>
          <RenderIf condition={categories?.length}>
            <div className="flex flex-row items-center gap-3">
              <div className="flex flex-row gap-3 overflow-x-scroll w-[70vw] ">
                <CardCategoryList
                  selectedCategoryList={selectedCategoryList}
                  setSelectedCategoryList={setSelectedCategoryList}
                  incrementCategoryByOne={incrementCategoryByOne}
                />
              </div>
            </div>
          </RenderIf>
          <RenderIf condition={!categories}>
            <p>No hay categorias</p>
          </RenderIf>
          <div className="flex flex-col">
            <SearchInput {...searchProps} />
            <div className="flex flex-row overflow-x-scroll w-[80vw] gap-5 p-5">
              {products.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  onClick={handleClickAddProduct}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <CardVariantList
              selectedVariantList={selectedVariantList}
              setSelectedVariantList={setSelectedVariantList}
            />
          </div>
          <SubmitButton
            mutation={createPromoMutation}
            className="btn btn-primary w-64 self-end"
            disabled={
              (selectedVariantList.length === 0 &&
                selectedCategoryList.length === 0) ||
              !name ||
              !price
            }
          >
            Crear Promo
          </SubmitButton>
        </form>
      </div>
    </section>
  );
};

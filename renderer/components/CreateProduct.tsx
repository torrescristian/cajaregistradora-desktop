import Loader from '@/components/Loader';
import useArticlesQuery from '@/hooks/services/useArticlesQuery';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect } from 'react';
import useCreateProductMutation from '@/hooks/services/useCreateProductMutation';
import { mergeClasses, toLC } from '@/libs/utils';
import FormField from './FormField';
import useStoreQuery from '@/hooks/services/useStoreQuery';

const Container = ({ children }: { children: React.ReactNode }) => (
  <section className="flex w-full flex-col items-center justify-around">
    {children}
  </section>
);

interface IForm {
  article: number;
  public_price: number;
  catalog_price?: number;
  special_price?: number;
  wholesale_price?: number;
}

interface IQuery {
  title: string;
  query: any;
  registerKey: any;
}

interface IProps {
  className?: string;
  handleChangeBox: () => void;
  show: boolean;
}
export default function CrearProducto({
  className,
  handleChangeBox,
  show,
}: IProps) {
  const storeQuery = useStoreQuery();
  const articlesQuery = useArticlesQuery();
  const createProductMutation = useCreateProductMutation();
  const schema = yup
    .object({
      article: yup.number().positive().integer().required(),
      public_price: yup.number().positive().required(),
      catalog_price: yup.number().optional(),
      special_price: yup.number().optional(),
      wholesale_price: yup.number().optional(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver<IForm>(schema),
    defaultValues: {
      public_price: 0,
      special_price: 0,
      catalog_price: 0,
      wholesale_price: 0,
    },
  });

  const createName = (data: IForm): string => {
    const article = articlesQuery.data?.find(
      (article) => article.id === data.article,
    )?.attributes?.name;

    return [article].filter((c) => !!c).join(' - ');
  };

  const createPayload = (data: IForm): any => {
    return {
      name: createName(data),
      price: data.public_price,
      public_price: data.public_price,
      catalog_price: data.catalog_price,
      special_price: data.special_price,
      wholesale_price: data.wholesale_price,
      isService: false,
      categories: [data.article].reduce(
        (acc, curr) => {
          if (!curr) {
            return acc;
          }

          acc.push({
            id: curr,
          });

          return acc;
        },
        [] as { id: number }[],
      ),
      // FIXME: change constant
      store: storeQuery.data?.id,
    };
  };

  const onSubmit = handleSubmit((data) => {
    const payload = createPayload(data);

    createProductMutation.mutate(payload);
    console.log(payload);
  });

  useEffect(() => {
    createProductMutation.error && console.log(createProductMutation.error);
  }, [createProductMutation.error]);
  return (
    <section className={mergeClasses('mb-32', className)}>
      <form
        onSubmit={onSubmit}
        className="flex flex-col rounded-lg shadow-lg py-10 gap-5 items-center w-96"
      >
        <h2 className="text-center text-2xl">Crear Producto</h2>
        {[
          {
            title: 'Categoria',
            query: articlesQuery,
            registerKey: 'article',
          },
        ].map(({ title, query, registerKey }: IQuery) =>
          query.isLoading ? (
            <Loader key={title} />
          ) : (
            <Container key={title}>
              <label>{title}</label>
              <select
                className="select-bordered select w-full max-w-xs"
                {...register(registerKey)}
              >
                <option key={0} value={0}></option>
                {query.data
                  ?.sort((a1: any, a2: any) =>
                    toLC(a1.attributes.name) > toLC(a2.attributes.name)
                      ? 1
                      : -1,
                  )
                  .map((article: any) => (
                    <option key={article.id} value={article.id}>
                      {article.attributes.name}
                    </option>
                  ))}
              </select>
              {/* @ts-ignore  */}
              {errors[registerKey] && (
                <p className="alert bg-red-500 p-4 text-stone-100">
                  {/* @ts-ignore  */}
                  {errors[registerKey]?.message}
                </p>
              )}
            </Container>
          ),
        )}
        <section className="flex flex-row flex-wrap justify-center gap-5">
          {[
            {
              title: 'Precio al publico',
              registerKey: 'public_price',
            },
            {
              title: 'Precio al catalogo',
              registerKey: 'catalog_price',
            },
            {
              title: 'Precio especial',
              registerKey: 'special_price',
            },
            {
              title: 'Precio al mayorista',
              registerKey: 'wholesale_price',
            },
          ].map(({ title, registerKey }: any) => (
            <FormField
              symbol="$"
              labelRight={true}
              register={register}
              label={title}
              formKey={registerKey}
              errors={errors}
            />
          ))}
        </section>
        {createProductMutation.isLoading ? (
          <Loader />
        ) : (
          <input
            className="btn-bordered btn-success btn w-fit text-stone-50"
            type="submit"
            value="Crear Producto"
          />
        )}
        {createProductMutation.isError && (
          <p className="alert bg-red-500 p-4 text-stone-100">
            {(createProductMutation.error as any).error.message}
          </p>
        )}
        {createProductMutation.isSuccess && (
          <p className="alert bg-green-500 p-4 text-stone-100">
            Producto creado con exito
          </p>
        )}
        <div className="flex whitespace-nowrap items-center gap-3">
          <input
            type="checkbox"
            id="marcar"
            className="checkbox checkbox-primary"
            checked={show}
            onChange={handleChangeBox}
          />
          <label htmlFor="marcar" className="label ">
            Crear variante
          </label>
        </div>
      </form>
    </section>
  );
}

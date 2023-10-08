import { mergeClasses, range } from '@/libs/utils';
import { IProductPage } from '@/interfaces/IProduct';
import { MouseEventHandler } from 'react';

interface IPagination {
  pagination: IProductPage['pagination'];
  onClick: (page: number) => MouseEventHandler;
  isLoading: boolean;
}

const Pagination = ({ pagination, onClick, isLoading }: IPagination) => {
  if (isLoading) return null;

  return (
    <section className="flex flex-row justify-center gap-5">
      {range(pagination.pageCount).map((i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            className={mergeClasses(
              'btn btn-primary flex text-white',
              page === pagination.page ? 'btn-primary' : 'btn-outline',
            )}
            onClick={onClick(page)}
          >
            {page}
          </button>
        );
      })}
    </section>
  );
};

export default Pagination;

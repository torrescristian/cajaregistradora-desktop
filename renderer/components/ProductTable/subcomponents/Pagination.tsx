import { mergeClasses, range } from '@/libs/utils';
import { IProductPage } from '@/interfaces/IProduct';
import Loader from '@/components/Loader';
import { MouseEventHandler } from 'react';

interface IPagination {
  pagination: IProductPage['pagination'];
  onClick: (page: number) => MouseEventHandler;
  isLoading: boolean;
}

const Pagination = ({ pagination, onClick, isLoading }: IPagination) => {
  if (isLoading) return <Loader className="w-full text-center" />;

  const buttons = range(pagination.pageCount).map((i) => {
    const page = i + 1;
    return (
      <button
        key={page}
        className={mergeClasses(
          'btn justify-center btn-primary my-3ter m-auto flex text-white',
          page === pagination.page ? 'btn-primary' : 'btn-outline'
        )}
        onClick={onClick(page)}
      >
        {page}
      </button>
    );
  });

  return <>{buttons}</>;
};

export default Pagination;

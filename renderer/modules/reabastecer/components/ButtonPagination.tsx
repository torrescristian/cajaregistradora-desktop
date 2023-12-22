import { longRange } from '@/modules/common/libs/utils';
import { useState, useCallback, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

export const useButtonPagination = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const onChangePage = useCallback((p: number) => () => setPage(p), []);

  const onNextPage = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setPage((p: number) => (p >= totalPages ? p : p + 1));
    },
    [totalPages],
  );

  const onPreviousPage = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setPage((p) => (p <= 1 ? p : p - 1));
  }, []);

  return {
    onNextPage,
    onPreviousPage,
    page,
    totalPages,
    setTotalPages,
    onChangePage,
  };
};

interface IProps {
  onNextPage: (e: React.MouseEvent) => void;
  onPreviousPage: (e: React.MouseEvent) => void;
  page: number;
  totalPages: number;
  onChangePage: (page: number) => () => void;
}

export const ButtonPagination = ({
  onNextPage,
  onPreviousPage,
  page,
  totalPages,
  onChangePage,
}: IProps) => {
  const totalPagesRange = useMemo(() => longRange(1, totalPages), [totalPages]);

  return (
    <div className="flex flex-row w-full items-center  justify-center gap-5">
      <button className="btn btn-secondary" onClick={onPreviousPage}>
        Anterior
      </button>
      {totalPagesRange.map((pageNumber) => (
        <button
          key={pageNumber}
          className={twMerge(
            pageNumber === page ? 'btn-disabled' : null,
            'join-item btn',
          )}
          onClick={onChangePage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button className="btn btn-secondary" onClick={onNextPage}>
        Siguiente
      </button>
    </div>
  );
};

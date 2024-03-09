import { useState, useCallback, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

import { RenderIf } from '@/modules/common/components/RenderIf';
import { longRange } from '@/modules/common/libs/utils';

export const usePagination = () => {
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

export const Pagination = ({
  onNextPage,
  onPreviousPage,
  page,
  totalPages,
  onChangePage,
}: IProps) => {
  const totalPagesRange = useMemo(() => longRange(1, totalPages), [totalPages]);
  const split = totalPagesRange.length > 10;
  const pages = totalPagesRange.slice(Math.max(page - 5, 0), page + 5);

  return (
    <div className="flex flex-row w-full items-center  justify-center gap-5">
      <button className="btn btn-secondary" onClick={onPreviousPage}>
        Anterior
      </button>
      <RenderIf condition={split}>
        <RenderIf condition={pages[0] > 1}>
          <button className="join-item btn btn-disabled">...</button>
        </RenderIf>
        {pages.map((pageNumber) => (
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
        <RenderIf condition={pages[pages.length - 1] > page}>
          <button className="join-item btn btn-disabled">...</button>
        </RenderIf>
      </RenderIf>
      <RenderIf condition={!split}>
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
      </RenderIf>

      <button className="btn btn-secondary" onClick={onNextPage}>
        Siguiente
      </button>
    </div>
  );
};

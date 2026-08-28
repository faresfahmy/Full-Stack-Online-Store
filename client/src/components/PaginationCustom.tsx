"use client";

import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "../ui/pagination";

interface PropsTypes {
  page: number;
  handlePagePlus: (value?: number) => void;
  handlePageMenus: () => void;
  countPages: number;
}

export default function PaginationCustom({
  page,
  handlePagePlus,
  handlePageMenus,
  countPages,
}: PropsTypes) {
  const getVisiblePages = () => {
    if (countPages <= 3) {
      return Array.from({ length: countPages }, (_, i) => i + 1);
    }

    if (page === 1) return [1, 2, 3];
    if (page === countPages) return [countPages - 2, countPages - 1, countPages];

    return [page - 1, page, page + 1];
  };

  const visiblePages = getVisiblePages();

  return (
    <Pagination>
      <PaginationContent>

        {page > 1 && (
          <PaginationItem className="text-white cursor-pointer">
            <PaginationPrevious onClick={() => handlePageMenus()} />
          </PaginationItem>
        )}

        <PaginationItem className="flex gap-2">
          {visiblePages.map((itemNum) => {
            const isActive = itemNum === page;
            return (
              <PaginationLink
                key={itemNum}
                onClick={() => handlePagePlus(itemNum)}
                className={`cursor-pointer w-8 h-8 rounded-lg font-medium flex items-center justify-center border transition-all ${
                  isActive
                    ? "bg-[#10b981] text-white border-[#10b981]"
                    : "bg-[#1e293b] text-slate-300 border-slate-700 hover:bg-slate-800"
                }`}
              >
                {itemNum}
              </PaginationLink>
            );
          })}
        </PaginationItem>

        {visiblePages[visiblePages.length - 1] < countPages && (
          <span className="px-1 text-slate-500 self-center">...</span>
        )}

        {page < countPages && (
          <PaginationItem className="text-white cursor-pointer">
            <PaginationNext onClick={() => handlePagePlus(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
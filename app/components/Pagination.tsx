import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
type Props = {
  page: number;
  padding: string;
};

export const PaginationDemo = ({ page, setPage, padding }: Props) => {
  let Pages = [];
  if (page <= 2) {
    Pages = [1, 2, 3];
  } else {
    Pages = [page - 1, page, page + 1];
  }
  const visiblePages = Array.from(new Set(Pages));
  return (
    <Pagination className={`pt-10 flex justify-end ${padding}`}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (page > 1) setPage(page - 1);
            }}
            className={
              page === 1 ? "pointer-events-none opacity-50" : "cursor-poiter"
            }
          />
        </PaginationItem>
        {visiblePages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              isActive={page === p}
              onClick={() => setPage(p)}
              className="cursor-pointer"
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => setPage(page + 1)}
            className="cursor-pointer"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

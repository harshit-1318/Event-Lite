
interface EventsPaginationProps {
  currentPage: number;
  totalPages: number;
  search?: string;
  category?: string;
  fee?: string;
  sort?: string;
}

export function EventsPagination({
  currentPage,
  totalPages,
  search,
  category,
  fee,
  sort,
}: EventsPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 pt-6">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <a
          key={p}
          href={`/events?page=${p}${search ? `&search=${search}` : ""}${
            category ? `&category=${category}` : ""
          }${fee ? `&fee=${fee}` : ""}${sort ? `&sort=${sort}` : ""}`}
          className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-semibold transition-colors ${
            p === currentPage
              ? "bg-blue-600 text-white shadow-xs"
              : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 hover:bg-slate-50"
          }`}
        >
          {p}
        </a>
      ))}
    </div>
  );
}

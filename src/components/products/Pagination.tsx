import { useRouter } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, basePath }) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    const newUrl = `${basePath}?${params.toString()}`;
    router.push(newUrl);
  };

  if (totalPages <= 1) return null;

  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + 2);

  if (currentPage === 1) {
    startPage = 1;
    endPage = Math.min(3, totalPages);
  } else if (currentPage === totalPages) {
    startPage = Math.max(1, totalPages - 2);
    endPage = totalPages;
  }

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="flex justify-center mt-4 space-x-1 sm:space-x-2">
      {/* First Page */}
      {currentPage > 2 && (
        <button className="px-4 py-2 rounded-lg bg-gray-300" onClick={() => handlePageChange(1)}>
          {"<<"}
        </button>
      )}

      {/* Prev Page */}
      {currentPage > 2 && (
        <button className="px-4 py-2 rounded-lg bg-gray-300" onClick={() => handlePageChange(currentPage - 1)}>
          {"<"}
        </button>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === page ? "bg-gray-200 text-black" : "text-black"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Page */}
      {currentPage < totalPages -1 && (
        <button className="px-4 py-2 rounded-lg bg-gray-300" onClick={() => handlePageChange(currentPage + 1)}>
          {">"}
        </button>
      )}

      {/* Last Page */}
      {currentPage < totalPages - 1 && (
        <button className="px-4 py-2 rounded-lg bg-gray-300" onClick={() => handlePageChange(totalPages)}>
          {">>"}
        </button>
      )}
    </div>
  );
};

export default Pagination;
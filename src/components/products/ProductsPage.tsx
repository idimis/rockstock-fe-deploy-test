import { useRouter } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  onPageChange: (page: number) => void;
}

const ProductsPage: React.FC<PaginationProps> = ({ currentPage, totalPages, basePath }) => {
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

  return (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        className={`px-4 py-2 mx-1 rounded-lg ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 mx-1 rounded-lg ${
            currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        className={`px-4 py-2 mx-1 rounded-lg ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"}`}
        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default ProductsPage;
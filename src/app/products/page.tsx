"use client";

import useProducts from "@/hooks/useProductSample";
import ProductCard from "@/components/products/ProductCard";
import Pagination from "@/components/products/Pagination";
import Navbar from "@/components/common/Navbar";

const Products = () => {
  const { products, currentPage, setCurrentPage, totalPages, loading } = useProducts();

  return (
    <><Navbar /><div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl text-gray-500 font-bold mb-4">Products</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.productId}
                productId={product.productId}
                productName={product.productName}
                price={product.price}
                productPictures={product.productPictures} />
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      )}

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </div></>
  );
};

export default Products;
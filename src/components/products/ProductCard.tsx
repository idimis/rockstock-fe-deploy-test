import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  productId: number;
  productName: string;
  price: number;
  productPictures: { productPictureUrl: string; position: number } | null;
}

const ProductCard: React.FC<ProductCardProps> = ({ productId, productName, price, productPictures }) => {
  const router = useRouter();

  const formatRupiah = (price: number) => {
    return price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  };

  return (
    <div
      key={productId}
      className="border p-4 rounded-lg text-gray-600 shadow-md cursor-pointer"
      onClick={() => router.push(`/products/${productId}`)}
    >
      <Image
        src={productPictures?.productPictureUrl || "/placeholder.png"}
        alt={productName}
        width={200} // Sesuaikan dengan kebutuhan
        height={128} // Sesuaikan dengan kebutuhan
        className="w-full h-32 object-cover rounded-md mb-2"
        priority // Mengutamakan pemuatan gambar utama
      />
      <h2 className="text-lg font-semibold">{productName}</h2>
      <p className="text-gray-600">{formatRupiah(price)}</p>
    </div>
  );
};

export default ProductCard;
import { useState } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  images: { productPictureUrl: string; position: number }[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentPosition, setCurrentPosition] = useState(1);

  const nextImage = () => {
    if (currentPosition < images.length) setCurrentPosition(currentPosition + 1);
  };

  const prevImage = () => {
    if (currentPosition > 1) setCurrentPosition(currentPosition - 1);
  };

  const currentImage = images.find((img) => img.position === currentPosition);

  return (
    <div className="relative w-64 h-64">
      <Image
        src={currentImage?.productPictureUrl || "/placeholder.png"}
        alt="Product"
        width={256}
        height={256}
        className="w-full h-full object-cover rounded-md"
        priority
      />
      {currentPosition > 1 && (
        <button onClick={prevImage} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1">
          ◀
        </button>
      )}
      {currentPosition < images.length && (
        <button onClick={nextImage} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1">
          ▶
        </button>
      )}
    </div>
  );
};

export default ImageCarousel;

import { useState } from "react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={images[activeImageIndex] || "/placeholder.svg"}
          alt={productName}
          className="h-full w-full object-cover object-center"
        />
      </div>
      
      {/* Image thumbnails */}
      <div className="flex space-x-4 overflow-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImageIndex(index)}
            className={`relative aspect-square w-20 flex-shrink-0 rounded-md overflow-hidden ${
              activeImageIndex === index ? 'ring-2 ring-brand' : ''
            }`}
          >
            <img
              src={image}
              alt={`${productName} - Image ${index + 1}`}
              className="h-full w-full object-cover object-center"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;

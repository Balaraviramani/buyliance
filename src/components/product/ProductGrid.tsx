
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  columns?: number;
  variant?: "default" | "compact" | "featured";
}

const ProductGrid = ({ 
  products, 
  title, 
  subtitle, 
  columns = 4, 
  variant = "default" 
}: ProductGridProps) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
  }[columns] || "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <section className="py-8">
      {(title || subtitle) && (
        <div className="mb-8 text-center">
          {title && <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h2>}
          {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
        </div>
      )}

      <div className={`grid ${gridCols} gap-6`}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} variant={variant} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="flex h-60 items-center justify-center rounded-lg bg-gray-100 text-center">
          <div>
            <p className="text-lg font-medium text-gray-900">No products found</p>
            <p className="mt-1 text-gray-600">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;

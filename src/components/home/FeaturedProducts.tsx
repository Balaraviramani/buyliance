
import ProductGrid from "../product/ProductGrid";
import { products } from "@/data/products";

const FeaturedProducts = () => {
  const featuredProducts = products.filter(product => product.featured);

  return (
    <section className="py-16 bg-commerce-bg-light">
      <div className="container mx-auto px-4">
        <ProductGrid 
          products={featuredProducts} 
          title="Featured Products" 
          subtitle="Discover our handpicked selection of premium products" 
          variant="featured"
        />
      </div>
    </section>
  );
};

export default FeaturedProducts;

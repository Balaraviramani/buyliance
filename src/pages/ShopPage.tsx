
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { products } from "@/data/products";
import ProductGrid from "@/components/product/ProductGrid";
import { ProductFilters } from "@/components/ui/product-filters";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Grid, Grid2X2, List } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const ShopPage = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "compact" | "list">("grid");
  const isMobile = useIsMobile();

  return (
    <MainLayout>
      {/* Shop Header */}
      <section className="bg-commerce-bg-light py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">All Products</h1>
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span className="font-medium text-brand">Shop</span>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-8 px-4">
        {/* Shop Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">{filteredProducts.length}</span> products
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {isMobile && (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            )}

            <div className="flex items-center border rounded-md overflow-hidden">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`px-3 py-1 rounded-none ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`px-3 py-1 rounded-none ${viewMode === 'compact' ? 'bg-gray-100' : ''}`}
                onClick={() => setViewMode("compact")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`px-3 py-1 rounded-none ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <select className="text-sm border rounded-md px-3 py-1.5">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Best Rating</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Always visible on desktop, conditionally on mobile */}
          {(!isMobile || showFilters) && (
            <aside className="w-full md:w-64 lg:w-72">
              <ProductFilters />
            </aside>
          )}
          
          {/* Product Grid */}
          <div className="flex-1">
            <ProductGrid 
              products={filteredProducts} 
              columns={viewMode === "list" ? 1 : 4} 
              variant={viewMode === "compact" ? "compact" : "default"} 
            />
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ShopPage;

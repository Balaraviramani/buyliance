
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { products } from "@/data/products";
import ProductGrid from "@/components/product/ProductGrid";
import { ProductFilters } from "@/components/ui/product-filters";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Grid, Grid2X2, List } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Product } from "@/types";
import { useToast } from "@/components/ui/use-toast";

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "compact" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sort') || "featured");
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Filter and sort products based on search params and sort selection
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter if present
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // Apply category filter if present
    const categoryFilter = searchParams.get('category');
    if (categoryFilter) {
      result = result.filter(
        product => product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Apply featured filter if present
    const featuredFilter = searchParams.get('featured');
    if (featuredFilter === 'true') {
      result = result.filter(product => product.featured);
    }

    // Apply discount filter if present
    const discountFilter = searchParams.get('discount');
    if (discountFilter === 'true') {
      result = result.filter(product => product.discountedPrice !== undefined);
    }
    
    // Apply sort
    switch (sortBy) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'featured':
      default:
        // Featured products first, then sort by rating
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
        break;
    }
    
    setFilteredProducts(result);
  }, [searchParams, sortBy]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('sort', value);
    setSearchParams(newSearchParams);
    
    toast({
      title: "Sort Applied",
      description: `Products sorted by ${value.replace(/-/g, ' ')}`,
    });
  };

  const handleViewModeChange = (mode: "grid" | "compact" | "list") => {
    setViewMode(mode);
    toast({
      title: "View Changed",
      description: `Changed to ${mode} view`,
    });
  };

  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
    toast({
      title: showFilters ? "Filters Hidden" : "Filters Shown",
      description: showFilters ? "Product filters are now hidden" : "Product filters are now visible",
    });
  };

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
                onClick={handleFilterToggle}
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
                onClick={() => handleViewModeChange("grid")}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`px-3 py-1 rounded-none ${viewMode === 'compact' ? 'bg-gray-100' : ''}`}
                onClick={() => handleViewModeChange("compact")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`px-3 py-1 rounded-none ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                onClick={() => handleViewModeChange("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <select 
              className="text-sm border rounded-md px-3 py-1.5"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating">Best Rating</option>
              <option value="newest">Newest</option>
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


import React from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { categories } from "@/data/products";
import { products } from "@/data/products";
import ProductGrid from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const CategoriesPage = () => {
  const { slug } = useParams<{ slug: string }>();

  // If we have a slug, filter products by that category
  const filteredProducts = slug
    ? products.filter((product) => product.category.toLowerCase() === slug.toLowerCase())
    : [];

  // Find the current category if slug is provided
  const currentCategory = slug
    ? categories.find((category) => category.slug === slug)
    : null;

  return (
    <MainLayout>
      {slug ? (
        // Display specific category
        <>
          {/* Category Header */}
          <section className="bg-commerce-bg-light py-8 px-4">
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <h1 className="text-3xl font-bold">{currentCategory?.name || "Category"}</h1>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <Link to="/" className="hover:text-brand">Home</Link>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <Link to="/categories" className="hover:text-brand">Categories</Link>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span className="font-medium text-brand">{currentCategory?.name || slug}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Category Description */}
          <section className="container mx-auto py-8 px-4">
            {currentCategory && (
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/4">
                    <img 
                      src={currentCategory.image}
                      alt={currentCategory.name}
                      className="rounded-lg w-full h-48 object-cover"
                    />
                  </div>
                  <div className="md:w-3/4">
                    <h2 className="text-2xl font-bold mb-4">{currentCategory.name}</h2>
                    <p className="text-gray-600 mb-4">{currentCategory.description}</p>
                    <p className="text-sm text-gray-500">{filteredProducts.length} products in this category</p>
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="py-8">
                <ProductGrid products={filteredProducts} columns={4} />
              </div>
            ) : (
              <div className="py-16 text-center">
                <h2 className="text-2xl font-bold mb-4">No products found</h2>
                <p className="text-gray-600 mb-8">We couldn't find any products in this category.</p>
                <Link to="/shop">
                  <Button>View All Products</Button>
                </Link>
              </div>
            )}
          </section>
        </>
      ) : (
        // Display all categories
        <>
          {/* Categories Header */}
          <section className="bg-commerce-bg-light py-8 px-4">
            <div className="container mx-auto">
              <h1 className="text-3xl font-bold">Browse Categories</h1>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <Link to="/" className="hover:text-brand">Home</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="font-medium text-brand">Categories</span>
              </div>
            </div>
          </section>

          {/* All Categories Grid */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">All Categories</h2>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                  Explore our product categories and find exactly what you need for your lifestyle.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/categories/${category.slug}`}
                    className="group relative overflow-hidden rounded-lg h-80"
                  >
                    <div className="absolute inset-0 bg-gray-100 overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                      <p className="text-white/80 text-sm mb-4">{category.description}</p>
                      <span className="inline-flex items-center text-sm font-medium text-white">
                        Explore Category
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </MainLayout>
  );
};

export default CategoriesPage;

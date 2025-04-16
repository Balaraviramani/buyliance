import { useState } from "react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { categories } from "@/data/products";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FilterGroup {
  id: string;
  name: string;
  open: boolean;
  options?: Array<{
    id: string;
    name: string;
    count: number;
  }>;
}

interface ProductFiltersProps {
  className?: string;
}

export function ProductFilters({ className }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([
    {
      id: "categories",
      name: "Categories",
      open: true,
      options: categories.map((category) => ({
        id: category.id,
        name: category.name,
        count: Math.floor(Math.random() * 100) + 1, // Placeholder count
      })),
    },
    {
      id: "brands",
      name: "Brands",
      open: true,
      options: [
        { id: "brand-1", name: "Apple", count: 42 },
        { id: "brand-2", name: "Samsung", count: 38 },
        { id: "brand-3", name: "Sony", count: 24 },
        { id: "brand-4", name: "Google", count: 16 },
        { id: "brand-5", name: "Microsoft", count: 12 },
      ],
    },
    {
      id: "ratings",
      name: "Ratings",
      open: true,
    },
    {
      id: "availability",
      name: "Availability",
      open: true,
      options: [
        { id: "in-stock", name: "In Stock", count: 120 },
        { id: "out-of-stock", name: "Out of Stock", count: 8 },
      ],
    },
  ]);

  const toggleFilterGroup = (id: string) => {
    setFilterGroups(
      filterGroups.map((group) =>
        group.id === id ? { ...group, open: !group.open } : group
      )
    );
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="space-y-6">
        {/* Price Range Filter */}
        <div className="border-b border-gray-200 pb-6">
          <div 
            className="flex cursor-pointer items-center justify-between py-2"
            onClick={() => toggleFilterGroup("price")}
          >
            <h3 className="text-sm font-medium text-gray-900">Price Range</h3>
          </div>
          <div className="mt-4 px-1">
            <Slider 
              defaultValue={[0, 1000]}
              max={1000}
              step={10}
              onValueChange={setPriceRange}
            />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-500">${priceRange[0]}</span>
              <span className="text-sm text-gray-500">${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Other Filter Groups */}
        {filterGroups.map((group) => (
          <div key={group.id} className="border-b border-gray-200 pb-6">
            <div 
              className="flex cursor-pointer items-center justify-between py-2"
              onClick={() => toggleFilterGroup(group.id)}
            >
              <h3 className="text-sm font-medium text-gray-900">{group.name}</h3>
              {group.open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
            {group.open && group.options && (
              <div className="mt-2 space-y-2">
                {group.options.map((option) => (
                  <div key={option.id} className="flex items-center">
                    <Checkbox id={option.id} />
                    <label
                      htmlFor={option.id}
                      className="ml-2 text-sm text-gray-600"
                    >
                      {option.name} ({option.count})
                    </label>
                  </div>
                ))}
              </div>
            )}
            {group.id === "ratings" && group.open && (
              <div className="mt-2 space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <Checkbox id={`rating-${rating}`} />
                    <label
                      htmlFor={`rating-${rating}`}
                      className="ml-2 flex items-center text-sm text-gray-600"
                    >
                      {Array.from({ length: rating }).map((_, i) => (
                        <svg
                          key={i}
                          className="h-4 w-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1">& Up</span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

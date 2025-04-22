
import { Link } from "react-router-dom";

interface ProductBreadcrumbsProps {
  category: string;
  productName: string;
}

const ProductBreadcrumbs = ({ category, productName }: ProductBreadcrumbsProps) => {
  return (
    <nav className="mb-6 text-sm">
      <ol className="flex items-center space-x-1">
        <li>
          <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
        </li>
        <li className="text-gray-500">/</li>
        <li>
          <Link to="/shop" className="text-gray-500 hover:text-gray-700">Shop</Link>
        </li>
        <li className="text-gray-500">/</li>
        <li>
          <Link to={`/categories/${category.toLowerCase()}`} className="text-gray-500 hover:text-gray-700">
            {category}
          </Link>
        </li>
        <li className="text-gray-500">/</li>
        <li className="text-brand font-medium">{productName}</li>
      </ol>
    </nav>
  );
};

export default ProductBreadcrumbs;

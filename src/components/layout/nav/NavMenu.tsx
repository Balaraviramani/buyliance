
import { Link } from "react-router-dom";

interface NavLink {
  name: string;
  path: string;
}

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Categories", path: "/categories" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

interface NavMenuProps {
  onItemClick?: () => void;
  className?: string;
}

export const NavMenu = ({ onItemClick, className = "" }: NavMenuProps) => (
  <div className={className}>
    {navLinks.map((link) => (
      <Link
        key={link.name}
        to={link.path}
        className="text-sm font-medium text-gray-700 transition-colors hover:text-brand"
        onClick={onItemClick}
      >
        {link.name}
      </Link>
    ))}
  </div>
);

export { navLinks };

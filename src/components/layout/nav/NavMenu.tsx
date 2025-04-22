
import { Link, useLocation } from "react-router-dom";

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

export const NavMenu = ({ onItemClick, className = "" }: NavMenuProps) => {
  const location = useLocation();
  
  return (
    <div className={className}>
      {navLinks.map((link) => {
        const isActive = location.pathname === link.path || 
                       (link.path !== "/" && location.pathname.startsWith(link.path));
        
        return (
          <Link
            key={link.name}
            to={link.path}
            className={`text-sm font-medium transition-colors hover:text-brand ${
              isActive ? "text-brand font-semibold" : "text-gray-700"
            }`}
            onClick={onItemClick}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
};

export { navLinks };

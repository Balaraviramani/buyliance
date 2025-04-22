
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { NavMenu } from "./nav/NavMenu";
import { SearchBar } from "./nav/SearchBar";
import { CartButton } from "./nav/CartButton";
import { UserMenu } from "./nav/UserMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
      <div className="container flex items-center justify-between h-16 mx-auto px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-xl font-bold text-brand">Buyliance</h1>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <NavMenu className="flex items-center space-x-6" />
        )}

        {/* Search, Cart and Account - always visible */}
        <div className="flex items-center space-x-4">
          {!isMobile && (
            <SearchBar className="w-40 md:w-64" />
          )}

          <CartButton />
          <UserMenu />

          {/* Mobile menu toggle */}
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && isMenuOpen && (
        <div className="absolute w-full bg-white border-b border-gray-200 shadow-lg py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <SearchBar className="w-full mb-2" />
            <NavMenu 
              className="flex flex-col space-y-2"
              onItemClick={() => setIsMenuOpen(false)}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


import { useState, useEffect } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  // Close mobile menu when switching to desktop view
  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu-container') && !target.closest('.menu-toggle-button')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav 
      className={`sticky top-0 z-40 w-full bg-white border-b border-gray-200 ${
        isScrolled ? 'shadow-sm' : ''
      }`}
      aria-label="Main navigation"
    >
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
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              className="menu-toggle-button"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
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
        <div className="absolute w-full bg-white border-b border-gray-200 shadow-lg py-4 animate-fade-in mobile-menu-container">
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

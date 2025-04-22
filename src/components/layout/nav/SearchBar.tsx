
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const SearchBar = ({ className = "" }: { className?: string }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    const trimmedQuery = searchQuery.trim();
    
    if (trimmedQuery) {
      setIsSubmitting(true);
      
      navigate(`/shop?search=${encodeURIComponent(trimmedQuery)}`);
      
      toast({
        title: "Searching",
        description: `Finding results for "${trimmedQuery}"`,
      });
      
      setSearchQuery("");
      setTimeout(() => setIsSubmitting(false), 500);
    } else {
      toast({
        title: "Error",
        description: "Please enter a search term",
        variant: "destructive",
      });
    }
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className={`relative ${className}`}
      role="search"
    >
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" aria-hidden="true" />
      <Input 
        placeholder="Search..." 
        className="pl-8 h-9" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Search products"
        disabled={isSubmitting}
      />
    </form>
  );
};

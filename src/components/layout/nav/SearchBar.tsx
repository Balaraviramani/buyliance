
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const SearchBar = ({ className = "" }: { className?: string }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      toast({
        title: "Searching",
        description: `Finding results for "${searchQuery}"`,
      });
    } else {
      toast({
        title: "Error",
        description: "Please enter a search term",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
      <Input 
        placeholder="Search..." 
        className="pl-8 h-9" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
};

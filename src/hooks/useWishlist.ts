import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useWishlist = (productId: string) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    checkWishlistStatus();
  }, [user, productId]);

  const checkWishlistStatus = async () => {
    if (!user) return;

    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('wishlist')
        .eq('id', user.id)
        .single();
        
      if (error) {
        console.error('Error checking wishlist status:', error);
        return;
      }

      setIsInWishlist(profile?.wishlist?.includes(productId) || false);
    } catch (error) {
      console.error('Error checking wishlist status:', error);
    }
  };

  const toggleWishlist = async (productName: string) => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to add items to your wishlist",
      });
      return;
    }

    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('wishlist')
        .eq('id', user.id)
        .single();
        
      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: "Failed to update wishlist",
          variant: "destructive",
        });
        return;
      }

      let newWishlist = profile?.wishlist || [];

      if (isInWishlist) {
        newWishlist = newWishlist.filter((id: string) => id !== productId);
      } else {
        newWishlist.push(productId);
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ wishlist: newWishlist })
        .eq('id', user.id);
        
      if (updateError) {
        console.error('Error updating wishlist:', updateError);
        toast({
          title: "Error",
          description: "Failed to update wishlist",
          variant: "destructive",
        });
        return;
      }

      setIsInWishlist(!isInWishlist);
      toast({
        title: isInWishlist ? "Removed from wishlist" : "Added to wishlist",
        description: isInWishlist 
          ? `${productName} has been removed from your wishlist`
          : `${productName} has been added to your wishlist`,
      });
    } catch (error) {
      console.error('Error updating wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to update wishlist",
        variant: "destructive",
      });
    }
  };

  return {
    isInWishlist,
    toggleWishlist,
  };
};
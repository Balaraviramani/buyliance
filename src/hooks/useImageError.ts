import { useState } from 'react';

export const useImageError = () => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const resetImageError = () => {
    setImageError(false);
  };

  return {
    imageError,
    handleImageError,
    resetImageError,
  };
};
"use client";
import { useState, useCallback, useEffect } from 'react';
import { ModalState } from '../types';
import { products } from '@/data/product';


export const useModal = () => {
  const [state, setState] = useState<ModalState>({
    currentProductIndex: 0,
    isVideoPlaying: false,
    isLoading: false
  });

  const currentProduct = products[state.currentProductIndex];
  const totalProducts = products.length;

  const nextProduct = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentProductIndex: (prev.currentProductIndex + 1) % totalProducts,
      isVideoPlaying: false
    }));
  }, [totalProducts]);

  const previousProduct = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentProductIndex: prev.currentProductIndex === 0 ? totalProducts - 1 : prev.currentProductIndex - 1,
      isVideoPlaying: false
    }));
  }, [totalProducts]);

  const goToProduct = useCallback((index: number) => {
    if (index >= 0 && index < totalProducts) {
      setState(prev => ({
        ...prev,
        currentProductIndex: index,
        isVideoPlaying: false
      }));
    }
  }, [totalProducts]);

  const toggleVideo = useCallback(() => {
    setState(prev => ({
      ...prev,
      isVideoPlaying: !prev.isVideoPlaying
    }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({
      ...prev,
      isLoading: loading
    }));
  }, []);

  // Auto-advance slides every 8 seconds when not playing video
  useEffect(() => {
    if (!state.isVideoPlaying) {
      const interval = setInterval(nextProduct, 8000);
      return () => clearInterval(interval);
    }
  }, [state.isVideoPlaying, nextProduct]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          previousProduct();
          break;
        case 'ArrowRight':
          nextProduct();
          break;
        case ' ':
          event.preventDefault();
          toggleVideo();
          break;
        case 'Escape':
          setState(prev => ({ ...prev, isVideoPlaying: false }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextProduct, previousProduct, toggleVideo]);

  return {
    state,
    currentProduct,
    totalProducts,
    nextProduct,
    previousProduct,
    goToProduct,
    toggleVideo,
    setLoading
  };
};
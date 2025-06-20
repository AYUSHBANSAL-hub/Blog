export interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  previewImage: string;
  backgroundImage: string;
  videoUrl?: string;
  ctaText: string;
  ctaUrl: string;
}

export interface PaginationIndicator {
  id: string;
  isActive: boolean;
}

export interface ModalState {
  currentProductIndex: number;
  isVideoPlaying: boolean;
  isLoading: boolean;
}
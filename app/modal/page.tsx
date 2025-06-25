"use client"
import React from 'react';
import { useModal } from '@/hooks/useModal';
import { PaginationIndicators } from '@/components/Modal/paginationIndicators';
import { VideoPreview } from '@/components/Modal/videoPreview';
import { NavigationButton } from '@/components/Modal/NavigationButton';
import { ProductInfo } from '@/components/Modal/productInfo';

const Modal = () => {
    const {
        state,
        currentProduct,
        totalProducts,
        nextProduct,
        previousProduct,
        goToProduct,
        toggleVideo,
        setLoading
    } = useModal();

    const handleCtaClick = (url: string) => {
        if (url && url !== '#') {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    const handleVideoToggle = () => {
        setLoading(true);
        // Simulate loading time
        setTimeout(() => {
            setLoading(false);
            toggleVideo();
        }, 500);
    };

    return (
        <div className="w-full min-h-screen bg-white mt-16 flex items-center justify-center p-4">
            <div className="relative w-full max-w-[1200px] h-[965px] rounded-[32px] overflow-hidden  shadow-2xl">
                <div className="p-0 relative h-full rounded-[32px]">
                    {/* Background images with overlay and transition */}
                    <div className="absolute w-full h-full top-0 left-0 rounded-[32px] overflow-hidden">
                        <div className="relative h-full">
                            {/* Dynamic background image */}
                            <div
                                className="absolute w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out"
                                style={{ backgroundImage: `url(/images/background-1.png)` }} // Note the `/` at the start!
                            />


                            {/* Dark overlay with breathing effect */}
                            <div className="w-full h-full bg-[#0b0b0d] opacity-60 absolute top-0 left-0 animate-pulse"
                                style={{ animationDuration: '4s' }} />

                            {/* Pagination indicators */}
                            <div className="absolute bottom-[141px] left-1/2 transform -translate-x-1/2">
                                <PaginationIndicators
                                    total={totalProducts}
                                    current={state.currentProductIndex}
                                    onIndicatorClick={goToProduct}
                                />
                            </div>

                            {/* Video preview */}
                            <div className="absolute top-[451px] left-1/2 transform -translate-x-1/2">
                                <VideoPreview
                                    previewImage={currentProduct.previewImage}
                                    isPlaying={state.isVideoPlaying}
                                    onTogglePlay={handleVideoToggle}
                                    isLoading={state.isLoading}
                                />
                            </div>

                            {/* Navigation buttons */}
                            <NavigationButton
                                direction="right"
                                onClick={nextProduct}
                                className="absolute top-[600px] right-[87px]"
                            />

                            <NavigationButton
                                direction="left"
                                onClick={previousProduct}
                                className="absolute top-[600px] left-[87px]"
                            />
                        </div>
                    </div>

                    {/* Product information section */}
                    <div className="absolute top-[85px] left-1/2 transform -translate-x-1/2">
                        <ProductInfo
                            product={currentProduct}
                            onCtaClick={handleCtaClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Modal
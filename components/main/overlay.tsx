import React from 'react';
import { Button } from '../ui/button';

const Overlay = () => {
  return (
    <div className="flex flex-col w-full items-center gap-10 pb-7 relative">
      <div className="w-full max-w-[1200px] rounded-[32px] overflow-hidden relative shadow-xl">
        <div className="relative h-[383px] md:h-[450px] lg:h-[500px]">
          {/* Background Image */}
          <img
            className="absolute rounded-2xl w-full h-full top-0 left-0 object-cover"
            alt="Background"
            src="/images/background-1.png"
          />
          
          {/* Overlay Layer */}
          <div className="absolute w-full h-full top-0 left-0 bg-[#0b0b0d] opacity-60" />

          {/* Content */}
          <div className="relative flex flex-col items-center justify-center h-full px-6 sm:px-12 md:px-[80px] lg:px-[150px] py-10 md:py-16 z-10">
            <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-[43px] max-w-[1114px]">
              <h2 className="font-['Figtree',Helvetica] font-bold text-white text-3xl sm:text-4xl md:text-[58px] text-center leading-tight md:leading-[56px]">
                Ready to Transform Your Workflow?
              </h2>
              <p className="max-w-[808px] font-['Manrope',Helvetica] font-normal text-[#aeaeae] text-sm sm:text-base text-center leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Sed est blandit pharetra et nibh sem urna pretium.
                Lorem ipsum dolor sit amet consectetur. Sed est blandit pharetra et nibh sem urna pretium.
                Lorem ipsum dolor sit amet consectetur. Sed est blandit pharetra et nibh sem urna pretium.
              </p>
            </div>

            <div className="mt-6">
              <Button className="bg-[#00b6ff] text-white font-['Inter',Helvetica] font-medium text-base sm:text-lg md:text-xl px-6 py-2 shadow-[0px_21px_8px_#63636303,0px_12px_7px_#63636308,0px_5px_5px_#6363630f,0px_1px_3px_#63636312]">
                Try Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overlay;

import React from 'react';
import { Button } from '../ui/button';

const Overlay = () => {
  return (
    <div className="flex flex-col mb-7 w-full items-center gap-10 pb-7 relative px-4 sm:px-6">
      <div className="w-full max-w-[1200px] h-auto md:h-[383.43px] rounded-[32px] overflow-hidden relative ">
        <div className="relative w-full h-full">
          {/* Background Image */}
          <img
            className="absolute rounded-2xl w-full h-full top-0 left-0 object-cover"
            alt="Background"
            src="/images/background-1.png"
          />

          {/* Overlay Layer */}
          <div className="absolute w-full h-full top-0 left-0 bg-[#0b0b0d] opacity-60" />

          {/* Content */}
          <div className="relative flex flex-col items-center justify-center pt-10 px-4 sm:px-6 z-10">
            <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-6 max-w-[1114px]">
              <h2 className="font-bold  text-white text-[28px] sm:text-[32px] md:text-[58px] leading-tight ">
                Ready to Transform Your Workflow?
              </h2>
              <p className="max-w-[808px] mt-3 font-normal text-[#aeaeae] text-sm sm:text-base text-center leading-relaxed" style={{ fontFamily: 'var(--font-roboto)' }}>
                Lorem ipsum dolor sit amet consectetur. Sed est blandit pharetra et nibh sem urna pretium.
                Lorem ipsum dolor sit amet consectetur. Sed est blandit pharetra et nibh sem urna pretium.
                Lorem ipsum dolor sit amet consectetur. Sed est blandit pharetra et nibh sem urna pretium.
              </p>
            </div>

            <div className="mt-14">
              <Button className="bg-[#00b6ff] text-[20px] w-[100px] h-[42px] text-white font-figtree font-medium text-sm sm:text-base md:text-lg px-[12px]  shadow-[0px_21px_8px_#63636303,0px_12px_7px_#63636308,0px_5px_5px_#6363630f,0px_1px_3px_#63636312]">
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

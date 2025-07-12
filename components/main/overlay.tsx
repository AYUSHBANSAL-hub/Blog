import React from 'react';
import { Button } from '../ui/button';

const Overlay = () => {
  return (
   <div className="flex flex-col items-center px-1 w-full md:px-4 sm:px-6 pb-7 mb-7 gap-10 relative">
  {/* ─── Banner Shell ─── */}
  <div
    className="
      w-full max-w-[1200px]
      h-full xs:h-[320px] sm:h-[360px] md:h-[383.43px]
      rounded-[32px] overflow-hidden relative
    "
  >
    {/* ─── Background Image ─── */}
    <img
      src="/images/background-1.png"
      alt="Background"
      className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
    />

    {/* ─── Dark Overlay ─── */}
    <div className="absolute top-0 left-0 w-full h-full bg-[#0b0b0d] opacity-60" />

    {/* ─── Content ─── */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full px-3 sm:px-6 pt-8 sm:pt-10">
      <div className="flex flex-col items-center gap-1 xs:gap-6 sm:gap-8 md:gap-6 max-w-[1114px] text-center">
        <h2
          className="
            font-bold text-white
            md:mt-0 xs:text-[26px] text-[48px] sm:text-[32px] md:text-[58px]
            leading-tight
          "
        >
          Ready to Transform Your Workflow?
        </h2>

        <p
          className="
            max-w-[808px]  sm:line-clamp-0 mt-2 sm:mt-3
            font-normal text-[#aeaeae]
            text-xs xs:text-sm sm:text-base
            leading-relaxed
          "
          style={{ fontFamily: 'var(--font-roboto)' }}
        >
         Leverage the power of intelligent AI agents to automate routine tasks, 
         enhance decision-making, streamline operations, and drive productivity — giving 
         your team more time to focus on what matters most Leverage the power of intelligent AI agents to automate routine tasks, 
         enhance decision-making, streamline operations, and drive productivity — giving 
         your team more time to focus on what matters most 
        </p>
      </div>

      {/* ─── Button ─── */}
      <div className="mt-7 sm:mt-10">
        <Button
          className="
            bg-[#00b6ff] text-white text-sm sm:text-base md:text-lg
            font-figtree font-medium
            mb-10
            px-5 sm:px-[12px]
            py-2 sm:py-3 md:py-[10px]
            rounded-[]
            w-fit
            shadow-[0px_21px_8px_#63636303,0px_12px_7px_#63636308,0px_5px_5px_#6363630f,0px_1px_3px_#63636312]
          "
        >
          Try Now
        </Button>
      </div>
    </div>
  </div>
</div>

  );
};

export default Overlay;

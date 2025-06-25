import React from "react";
import ExploreOnePage from "./explore-1";
import ExploreTwoPage from "./explore-2";

const ExplorePage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 ">
      {/* Heading */}
      <h2 className="font-semibold text-[#202124]  text-3xl md:text-7xl text-center leading-[72px] xl:mb-0 mb-10 ">
        Products to Explore
      </h2>

      {/* Wrapper that perfectly centers the two columns */}
      <div className="w-full max-w-6xl flex justify-center">
        <div className="flex flex-col xl:flex-row  xl:gap-64 w-full justify-center items-center">
          {/* Left Column */}
          <div className="flex justify-center  items-center w-full md:w-[50%]">
            <ExploreOnePage />
          </div>

          {/* Right Column */}
          <div className="flex justify-center xl:mt-40 items-center w-full md:w-[50%]">
            <ExploreTwoPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;

import React from "react";
import ExploreOnePage from "./explore-1";
import ExploreTwoPage from "./explore-2";

const ExplorePage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 ">
      {/* Heading */}
      <h2 className="font-semibold text-[#202124]  text-7xl text-center leading-[72px] md:mb-0 mb-10 ">
        Products to Explore
      </h2>

      {/* Wrapper that perfectly centers the two columns */}
      <div className="w-full max-w-7xl flex justify-center">
        <div className="flex flex-col md:flex-row md:gap-40 w-full justify-center items-center">
          {/* Left Column */}
          <div className="flex justify-center  items-center w-full md:w-[50%]">
            <ExploreOnePage />
          </div>

          {/* Right Column */}
          <div className="flex justify-center md:mt-40 items-center w-full md:w-[50%]">
            <ExploreTwoPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;

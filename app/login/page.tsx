import React from "react";
import LoginFormSection from "@/components/login/login-form";

const LogIn = () => {
  return (
    <main className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute w-60 h-60 top-10 left-[30%] rounded-full blur-[60px] bg-gradient-to-br from-green-100 to-blue-100 opacity-40 z-0" />
      <div className="absolute w-[560px] h-[560px] top-[216px] left-[70%] rounded-full blur-[80px] bg-gradient-to-br from-blue-100 to-green-100 opacity-30 z-0" />
      <div className="absolute w-60 h-60 top-40 left-[85%] rounded-full blur-[40px] bg-gradient-to-br from-green-100 to-blue-100 opacity-50 z-0" />
      
      <img src='images/Ellipse-2.svg' className="absolute" />

      <div className="relative w-full flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 md:px-8 lg:px-[161px] py-16 sm:py-20 bg-neutral-50">
        {/* Left Section (visible on lg+) */}
        <div className="relative w-full max-w-[50%] hidden lg:block">
          <h1 className="font-['Figtree',Helvetica] font-semibold text-zinc-950 text-3xl sm:text-4xl lg:text-5xl leading-tight lg:leading-[64px] mb-8 lg:mb-12">
            Discover,<br />connect, and grow
          </h1>

          <div className="relative mt-16 lg:mt-28 w-full h-[400px] lg:h-[500px]">
            <img
              src="/images/login-img-4.png"
              alt="Start Journey"
              className="absolute top-0 left-0 w-[240px] sm:w-[300px] lg:w-[360px] rounded-2xl shadow-xl z-10"
            />
            <img
              src="/images/login-img-3.png"
              alt="Member Process"
              className="absolute top-[140px] sm:top-[160px] left-[180px] sm:left-[220px] lg:left-[260px] w-[200px] sm:w-[240px] lg:w-[300px] rounded-xl shadow-md z-20"
            />
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="relative w-full max-w-[551px] bg-white rounded-lg border-2 shadow-md px-4 sm:px-6 md:px-10 lg:px-[40px] py-10 z-30 mt-10 lg:mt-0 lg:-ml-20">
          <LoginFormSection />
        </div>
      </div>
    </main>
  );
};

export default LogIn;

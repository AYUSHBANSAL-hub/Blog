import React from "react";
import LoginFormSection from "@/components/login/login-form";
import SignUpFormSection from "@/components/login/signup-form";

const LogIn = () => {
  return (
    <main className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute w-60 h-60 top-10 left-[30%] rounded-full blur-[60px] bg-gradient-to-br from-green-100 to-blue-100 opacity-40 z-0" />
      <div className="absolute w-[560px] h-[560px] top-[216px] left-[70%] rounded-full blur-[80px] bg-gradient-to-br from-blue-100 to-green-100 opacity-30 z-0" />
      <div className="absolute w-60 h-60 top-40 left-[85%] rounded-full blur-[40px] bg-gradient-to-br from-green-100 to-blue-100 opacity-50 z-0" />

      <div className="relative w-full flex flex-col lg:flex-row items-center justify-center px-4 md:px-8 lg:px-[161px] py-20 bg-neutral-50 z-10">
        {/* Left Section */}
        <div className="relative w-full max-w-[50%] hidden lg:block z-10">
          {/* Heading */}
          <h1 className=" font-semibold text-zinc-950 text-5xl leading-[64px] mb-12">
            Discover,
            <br />
            connect, and grow
          </h1>

          {/* Floating card visuals */}
          <div className="relative mt-28 w-full h-[500px]">
            <img
              src="/images/Frame-1.svg"
              alt="Start Journey"
              className="absolute top-0 left-0 w-[360px] rounded-2xl shadow-xl z-10"
            />
            <img
              src="/images/Frame-2.svg"
              alt="Member Process"
              className="absolute top-[180px] left-[260px] w-[300px] rounded-xl shadow-md z-20"
            />
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="relative w-full max-w-[551px] bg-white rounded-2xl shadow-md p-8 z-30 md:mt-10 lg:-ml-20">
          <SignUpFormSection/>
        </div>
      </div>
    </main>
  );
};

export default LogIn;

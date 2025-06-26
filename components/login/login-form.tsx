"use client";
import { EyeIcon, MailIcon } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";

const LoginFormSection = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full max-w-[471px] shadow-shadow bg-white px-4 sm:px-6 md:px-0 mx-auto">
  <div className="flex flex-col gap-6 sm:gap-[24px] py-8">
    {/* Heading */}
    <h1 className="text-3xl sm:text-4xl font-semibold text-[#09090B] leading-tight">
      Log in
    </h1>

    {/* Form */}
    <div className="flex flex-col gap-6 sm:gap-[16px]">
      {/* Email Field */}
      <div className="flex flex-col gap-[6px] sm:gap-[8px]">
        <label htmlFor="email" className="font-semibold text-sm text-zinc-800 leading-5">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="min-h-[40px] px-[12px] py-[10px] text-sm rounded-md"
        />
      </div>

      {/* Password Field */}
      <div className="flex flex-col gap-[6px] sm:gap-[8px]">
        <label htmlFor="password" className="font-semibold text-sm text-zinc-800 leading-5">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="min-h-[40px] px-[12px] py-[10px] text-sm rounded-md"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
            onClick={() => setShowPassword(!showPassword)}
          >
            <EyeIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between text-sm gap-2">
        <div className="flex items-center gap-2">
          <Checkbox id="remember" className="w-4 h-4" />
          <label htmlFor="remember" className="text-[#52525c]">Remember me</label>
        </div>
        <Button variant="ghost" className="h-8 px-2 py-1 text-[#52525c]">
          Forgot password?
        </Button>
      </div>

      {/* Login Button */}
      <div className="w-full">
        <Button className="w-full min-h-[40px] px-4 py-[10px] bg-zinc-950 text-neutral-50 rounded-lg flex gap-2 justify-center items-center">
          <MailIcon className="w-[20px] h-[20px]" />
          <span className="text-sm">Log in with email</span>
        </Button>
      </div>

      {/* Sign up link */}
      <div className="flex flex-wrap items-center mt-[18px] justify-center gap-[12px] text-sm">
        <span className="text-[#71717b]">Don&apos;t have an account?</span>
        <Link href="/signup">
          <div className="h-8 px-2 py-1 text-[#52525c] hover:text-black">Sign up</div>
        </Link>
      </div>

      {/* Terms */}
      <p className="text-xs mt-[16px] text-center text-[#71717b] leading-4 px-2">
        By clicking Continue, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  </div>
</div>

    );
};

export default LoginFormSection;

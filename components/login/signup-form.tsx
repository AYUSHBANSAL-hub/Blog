"use client";
import { EyeIcon, MailIcon } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";

const SignUpFormSection = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="w-[471px] flex flex-col gap-8 bg-white">
            <h1 className="text-4xl font-semibold text-[#09090B] ">
                Sign Up
            </h1>

            <form className="flex flex-col">

                <div className="flex flex-col gap-[16px]">
                {/* Full Name */}
                <div className="flex flex-col gap-[8px]">
                    <label htmlFor="name" className="text-sm font-[700] text-[#27272A]">
                        Full Name
                    </label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Enter your Full Name"
                        className="min-h-[40px] px-[12px] py-[10px] text-sm rounded-md"
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-[8px]">
                    <label htmlFor="email" className="text-sm font-[700] text-[#27272A]">
                        Email
                    </label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="min-h-[40px] px-[12px] py-[10px] text-sm rounded-md"
                    />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-[8px]">
                    <label htmlFor="phone" className="text-sm font-[700] text-[#27272A]">
                        Phone Number
                    </label>
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your Phone Number"
                        className="min-h-[40px] px-[12px] py-[10px] text-sm rounded-md"
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-[8px]">
                    <label htmlFor="password" className="text-sm font-[700] text-[#27272A]">
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
                            className="absolute right-1 top-1/2 -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <EyeIcon className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="confirm-password" className="text-sm font-[700] text-[#27272A]">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <Input
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="min-h-[40px] px-[12px] py-[10px] text-sm rounded-md"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            <EyeIcon className="w-4 h-4" />
                        </Button>
                    </div>
                    {/* Remember Me & Forgot */}
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <Checkbox id="remember" className="w-4 h-4" />
                        <label htmlFor="remember" className="text-[#52525c]">
                            Remember me
                        </label>
                    </div>
                    <Button variant="ghost" className="h-8 px-2 py-1 text-[#52525c]">
                        Forgot password?
                    </Button>
                </div>
                </div>  

                {/* Submit Button */}
                <div className="flex flex-col mt-[8px] gap-4">
                <Button className="w-full min-h-[40px] px-4 py-[10px] bg-[#09090B] text-neutral-50 mt-2 rounded-md flex items-center justify-center gap-2">
                    <MailIcon className="w-[20px] h-[20px]" />
                    <span className="text-sm font-medium">Log in with email</span>
                </Button>

                </div>
                </div>

                {/* Sign In Link */}
                <div className="flex items-center justify-center mt-[18px] text-sm gap-[16px]">
                    <span className="text-[#71717b]">Already have an account?</span>
                    <Link href="/login">
                        <div  className="h-8 px-2 py-1 text-[#52525c] hover:text-black">
                            Sign In
                        </div>
                    </Link>
                </div>
                {/* Terms */}
                <p className="text-xs text-center mt-[18px] text-[#71717b] leading-4">
                    By clicking Continue, you agree to our Terms of Service and Privacy Policy.
                </p>
                
            </form>
        </div>
    );
};

export default SignUpFormSection;

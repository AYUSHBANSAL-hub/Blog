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
        <div className="w-full max-w-[600px] px-4 py-4 space-y-2 bg-white">
            <h1 className="text-2xl font-semibold text-zinc-950 font-['Figtree',Helvetica]">
                Sign Up
            </h1>

            <form className="space-y-2">
                {/* Full Name */}
                <div className="space-y-1">
                    <label htmlFor="name" className="text-sm font-semibold text-zinc-800">
                        Full Name
                    </label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Enter your Full Name"
                        className="min-h-[34px] px-3 py-1 text-sm rounded-md"
                    />
                </div>

                {/* Email */}
                <div className="space-y-1">
                    <label htmlFor="email" className="text-sm font-semibold text-zinc-800">
                        Email
                    </label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="min-h-[34px] px-3 py-1 text-sm rounded-md"
                    />
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                    <label htmlFor="phone" className="text-sm font-semibold text-zinc-800">
                        Phone Number
                    </label>
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your Phone Number"
                        className="min-h-[34px] px-3 py-1 text-sm rounded-md"
                    />
                </div>

                {/* Password */}
                <div className="space-y-1">
                    <label htmlFor="password" className="text-sm font-semibold text-zinc-800">
                        Password
                    </label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="min-h-[34px] px-3 py-1 text-sm rounded-md"
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
                <div className="space-y-1">
                    <label htmlFor="confirm-password" className="text-sm font-semibold text-zinc-800">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <Input
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="min-h-[34px] px-3 py-1 text-sm rounded-md"
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

                {/* Submit Button */}
                <Button className="w-full min-h-[36px] px-4 py-2 bg-zinc-950 text-neutral-50 rounded-md flex items-center justify-center gap-2">
                    <MailIcon className="w-4 h-4" />
                    <span className="text-sm">Log in with email</span>
                </Button>

                {/* Sign In Link */}
                <div className="flex items-center justify-center text-sm gap-1">
                    <span className="text-[#71717b]">Already have an account?</span>
                    <Link href="/login">
                        <Button variant="ghost" className="h-8 px-2 py-1 text-[#52525c]">
                            Sign In
                        </Button>
                    </Link>
                </div>
                {/* Terms */}
                <p className="text-xs text-center text-[#71717b] leading-4">
                    By clicking Continue, you agree to our Terms of Service and Privacy Policy.
                </p>
            </form>
        </div>
    );
};

export default SignUpFormSection;

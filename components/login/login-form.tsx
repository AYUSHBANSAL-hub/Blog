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
        <div className="w-full max-w-[600px]  shadow-shadow rounded-2xl">
            <div className=" space-y-6">
                <div className="space-y-5">
                    <h1 className="text-4xl font-semibold text-[#09090B] leading-tight ">
                        Log in
                    </h1>

                    <div className="space-y-5">
                        {/* Email Field */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="email"
                                className="font-semibold text-sm text-zinc-800 leading-5 "
                            >
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="min-h-9 px-3 py-2 text-sm rounded-lg"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="password"
                                className="font-semibold text-sm text-zinc-800 leading-5 "
                            >
                                Password
                            </label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="min-h-9 px-3 py-2 text-sm rounded-lg"
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

                        {/* Remember and Forgot */}
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

                    {/* Login Button */}
                    <div className="w-full">
                        <Button className="w-full min-h-9 px-4 py-2 bg-zinc-950 text-neutral-50 rounded-lg flex gap-2">
                            <MailIcon className="w-4 h-4" />
                            <span className="text-sm">Log in with email</span>
                        </Button>
                    </div>

                    {/* Sign up link */}
                    <div className="flex items-center justify-center text-sm">
                        <span className="text-[#71717b]">Don&apos;t have an account?</span>
                        <Link href="/signup">
                            <Button variant="ghost" className="h-8 px-2 py-1 text-[#52525c]">
                                Sign up
                            </Button>
                        </Link>
                    </div>

                    {/* Terms */}
                    <p className="text-xs text-center text-[#71717b] leading-4">
                        By clicking Continue, you agree to our Terms of Service and Privacy
                        Policy.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginFormSection;

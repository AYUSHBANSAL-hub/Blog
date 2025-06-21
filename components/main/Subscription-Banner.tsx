"use client";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SubscriptionBanner = () => {
    return (
        <div className="w-full flex justify-center mb-20 px-2">
            <div className="relative w-full max-w-[1193px] h-[478px] bg-[#3890dec4] rounded-[32px] px-6 py-8 md:px-12 md:py-6 overflow-visible">

                {/* Image that exceeds the banner from the top */}
                <img
                    src="/images/banner-img.png"
                    alt="Banner Character"
                    className="absolute top-[-54px] right-0 md:right-[60px] w-[320px] md:w-[500px] object-contain z-20"
                />

                <div className="container mt-7">
                    {/* Highlight badge */}
                    <div className="inline-flex items-center justify-center px-[20px] py-[6px] bg-[#ffffff33] rounded-full">
                        <span className="font-figtree font-bold text-white text-[16px]">
                            Highlight
                        </span>
                    </div>

                    {/* Heading & description */}
                    <div className="flex flex-col w-full max-w-[499px] gap-4 mt-1">
                        <h2 className="font-figtree font-bold text-white text-[32px] md:text-[48px] leading-snug">
                            Subscribe to our
                            <br />
                            Blogs for updates
                        </h2>
                        <p className="font-figtree font-normal text-white text-lg leading-normal">
                            Stay informed with the latest news, insights, and updates
                            delivered straight to your inbox
                        </p>
                    </div>

                    {/* Email input + submit button */}
                    <div className="flex flex-col w-full max-w-[497px] gap-4 mt-6 md:mt-12">
                        <div className="flex flex-col md:flex-row items-center gap-4 w-full">

                            {/* Email Box */}
                            <div className="flex items-center w-[358px] rounded-[72px] border border-[#ffffff66] px-[18px] pr-8 py-4 gap-[10px]">
                                <div className="w-5 h-5 bg-[url('/sms-notification.png')] bg-contain bg-no-repeat" />
                                <Input
                                    className="border-none bg-transparent font-roboto font-medium text-[#ffffff99] text-lg placeholder:text-[#ffffff99] focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
                                    placeholder="Email address"
                                />
                            </div>

                            {/* Submit Button */}
                            <Button className="w-[124px] h-[54px] px-8 py-4 bg-white rounded-[80px] font-figtree font-bold text-[#3890DE] text-lg">
                                Submit
                            </Button>
                        </div>
                    </div>

                    {/* Terms */}
                    <div className="flex items-center mt-4 gap-2 w-[294px] h-[22px] whitespace-nowrap">
                        {/* Circular Checkbox */}
                        <input
                            type="checkbox"
                            className="appearance-none w-[18px] h-[18px] rounded-full border border-white bg-transparent checked:bg-white checked:before:content-['✔'] checked:before:text-[#3890DE] checked:before:text-[12px] checked:before:flex checked:before:items-center checked:before:justify-center"
                        />
                        {/* Single-line Text */}
                        <p className="font-figtree font-normal text-white text-[16px] leading-[120%]">
                            I agree with the{" "}
                            <span className="underline underline-offset-2 decoration-solid">
                                Terms and condition
                            </span>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SubscriptionBanner;

"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Mail } from "lucide-react"
import { Checkbox } from "../ui/checkbox"

const SubscriptionBanner = () => {
  return (
    <div className="w-full flex justify-center px-1 mb-10 sm:mb-0 md:px-4">
  {/* ——— Banner Wrapper ——— */}
  <div
    className="
      relative w-full max-w-[1193px]
      min-h-[220px] xs:min-h-[260px] sm:min-h-[478px] md:h-[478px]
      bg-[#3890dec4] rounded-[24px]
      px-1 py-10 sm:px-6 sm:py-8 md:px-12 md:py-6
      overflow-visible
    "
  >
    {/* ——— Character Illustration ——— */}
    <Image
      src="/images/banner-img.png"
      alt="Banner Character"
      width={500}
      height={550}
      className="
        absolute object-contain z-10
        w-[240px] h-[240px]  top-[-90px] xs:top-[-50px] right-[50%] transform translate-x-1/2
        sm:w-[280px] sm:h-[280px] sm:right-[20px] sm:top-[-70px] sm:translate-none
        md:w-[300px] md:h-[300px] md:right-[10px]
        lg:w-[500px] lg:h-[500px] lg:right-[60px] lg:top-[-50px]
        custom-style
      "
      priority
      
    />

    {/* ——— Content Block ——— */}
    <div className="relative z-20 mt-30  sm:px-0 sm:mt-7">
      {/* Highlight Badge */}
      <div className="flex items-center justify-center sm:items-start sm:justify-start ">
      <div className="inline-flex items-center text-center px-[20px] py-[6px] bg-[#ffffff33] rounded-full">
        <span className="font-[700] text-white text-sm sm:text-[16px]">Highlight</span>
      </div>
      </div>

      {/* Heading + Description */}
      <div className="flex flex-col items-center text-center sm:text-start sm:items-start w-full max-w-full md:max-w-[499px] gap-3 sm:gap-4 mt-2 sm:mt-1">
        <h2 className="font-bold text-white text-[43px] xs:text-[28px] sm:text-[32px] md:text-[48px] leading-tight sm:leading-snug">
          Subscribe to our
          <br />
          Blogs for updates
        </h2>
        <p className="font-[400] text-white text-[15px] xs:text-sm sm:text-base md:text-[18px] leading-relaxed sm:leading-normal">
          Stay informed with the latest news, insights, and updates delivered straight to your inbox
        </p>
      </div>

     {/* Email Input + Submit */}
<div className="flex flex-col px-4 sm:px-0 w-full max-w-full md:max-w-[497px] gap-4 mt-6 md:mt-8 lg:mt-12">
  <div className="flex flex-col sm:flex-col md:flex-row items-stretch md:items-center gap-3 sm:gap-4 w-full">

    {/* Email Box */}
    <div className="flex items-center w-full md:w-[358px] rounded-[72px] border border-[#ffffff66] py-2 px-3 md:px-[18px] md:py-[16px] gap-3">
      <div className="relative w-5 h-5">
        <Image src="/images/landing/sms-notification.svg" alt="SMS" fill className="object-contain" />
      </div>
      <input
        type="email"
        className="
          appearance-none border-none outline-none bg-transparent
          font-medium text-[#ffffffcc] placeholder:text-[#FFFFFF99]
          text-sm xs:text-base placeholder:text-sm xs:placeholder:text-base
          w-full p-0
        "
        style={{ fontFamily: 'var(--font-roboto)' }}
        placeholder="Email address"
      />
    </div>

    {/* Terms - Mobile only */}
    <div className="flex items-center px-1 gap-2 w-full max-w-md sm:max-w-none h-auto md:hidden">
      <Checkbox
        id="terms-mobile"
        className="
          h-[14px] w-[14px] rounded-full border-2 border-white
          data-[state=checked]:bg-white
          data-[state=checked]:text-[#63b3ed]
          data-[state=checked]:border-white
          focus-visible:ring-0 focus-visible:ring-offset-0
        "
      />
      <label
        htmlFor="terms-mobile"
        className="
          font-[400] text-white text-[10px] xs:text-xs sm:text-sm md:text-[18px]
          leading-snug sm:leading-[120%] cursor-pointer
        "
      >
        I agree with the <span className="underline underline-offset-2">Terms and condition</span>
      </label>
    </div>

    {/* Submit Button */}
    <div className=" flex justify-center items-center sm:items-start sm:justify-start">
    <Button
      className="
        w-20  md:w-auto md:h-[42px] 
        md:px-8 md:py-7
        bg-white hover:bg-gray-100 rounded-[80px]
        font-bold text-[#3891DEC4] text-sm xs:text-base sm:text-lg
        flex-shrink-0
      "
    >
      Submit
    </Button>
    </div>
  </div>

  {/* Terms - Desktop only */}
  <div className="hidden md:flex items-center  gap-2 w-full max-w-md sm:max-w-none h-auto">
    <Checkbox
      id="terms-desktop"
      className="
        h-[18px] xs:h-[19.5px] w-[18px] xs:w-[19.5px] rounded-full border-2 border-white
        data-[state=checked]:bg-white
        data-[state=checked]:text-[#63b3ed]
        data-[state=checked]:border-white
        focus-visible:ring-0 focus-visible:ring-offset-0
      "
    />
    <label
      htmlFor="terms-desktop"
      className="
        font-[400] text-white text-[10px] xs:text-xs sm:text-sm md:text-[18px]
        leading-snug sm:leading-[120%] cursor-pointer
      "
    >
      I agree with the <span className="underline underline-offset-2">Terms and condition</span>
    </label>
  </div>
</div>

    </div>
  </div>
</div>

  )
}

export default SubscriptionBanner

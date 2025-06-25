"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Mail } from "lucide-react"
import { Checkbox } from "../ui/checkbox"

const SubscriptionBanner = () => {
  return (
    <div className="w-full flex justify-center mb-10 sm:mb-0 px-4">
  {/* ——— Banner Wrapper ——— */}
  <div
    className="
      relative w-full max-w-[1193px]
      min-h-[220px] xs:min-h-[260px] sm:min-h-[478px] md:h-[478px]
      bg-[#3890dec4] rounded-[24px]
      px-4 py-10 sm:px-6 sm:py-8 md:px-12 md:py-6
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
        w-[120px] xs:w-[150px] top-[-40px] xs:top-[-50px] right-3
        sm:w-[320px] sm:top-[-54px] sm:right-0
        md:w-[260px] md:right-[10px]
        lg:w-[500px] lg:right-[60px]
      "
      priority
    />

    {/* ——— Content Block ——— */}
    <div className="relative z-20 mt-4 sm:mt-7">
      {/* Highlight Badge */}
      <div className="inline-flex items-center justify-center px-[20px] py-[6px] bg-[#ffffff33] rounded-full">
        <span className="font-[700] text-white text-sm sm:text-[16px]">Highlight</span>
      </div>

      {/* Heading + Description */}
      <div className="flex flex-col w-full max-w-full md:max-w-[499px] gap-3 sm:gap-4 mt-2 sm:mt-1">
        <h2 className="font-bold text-white text-[26px] xs:text-[28px] sm:text-[32px] md:text-[48px] leading-tight sm:leading-snug">
          Subscribe to our
          <br />
          Blogs for updates
        </h2>
        <p className="font-[400] text-white text-xs xs:text-sm sm:text-base md:text-[18px] leading-relaxed sm:leading-normal">
          Stay informed with the latest news, insights, and updates delivered straight to your inbox
        </p>
      </div>

      {/* Email Input + Submit */}
      <div className="flex flex-col w-full max-w-full md:max-w-[497px] gap-4 mt-6 md:mt-8 lg:mt-12">
        <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-4 w-full">
          {/* Email Box */}
          <div className="flex items-center w-full md:w-[358px] rounded-[72px] border border-[#ffffff66] px-3 md:px-[18px] md:py-[16px] gap-3">
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

          {/* Submit Button */}
          <Button
            className="
              w-full md:w-auto h-[46px] xs:h-[50px] md:h-[54px]
              px-4 xs:px-6 md:px-8
              py-2 xs:py-3 md:py-4
              bg-white hover:bg-gray-100 rounded-[80px]
              font-bold text-[#3891DEC4] text-sm xs:text-base sm:text-lg
              flex-shrink-0
            "
          >
            Submit
          </Button>
        </div>
      </div>

      {/* Terms + Checkbox */}
      <div className="flex items-center mt-4 gap-2 w-full max-w-md sm:max-w-none h-auto">
        <Checkbox
          id="terms"
          className="
            h-[18px] xs:h-[19.5px] w-[18px] xs:w-[19.5px] rounded-full border-2 border-white
            data-[state=checked]:bg-white
            data-[state=checked]:text-[#63b3ed]
            data-[state=checked]:border-white
            focus-visible:ring-0 focus-visible:ring-offset-0
          "
        />
        <label
          htmlFor="terms"
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

  )
}

export default SubscriptionBanner

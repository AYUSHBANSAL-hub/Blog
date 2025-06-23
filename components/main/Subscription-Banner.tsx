"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Mail } from "lucide-react"

const SubscriptionBanner = () => {
  return (
    <div className="w-full flex justify-center mb-10 sm:mb-20 px-4">
      <div className="relative w-full max-w-[1193px] min-h-[200px] sm:min-h-[480px] md:h-[478px] bg-[#3890dec4] rounded-[32px] px-4 py-10 sm:px-6 sm:py-8 md:px-12 md:py-6 overflow-visible">

        <Image
          src="/images/banner-img.png"
          alt="Banner Character"
          width={500} // Original width for md, used for aspect ratio
          height={550} // Approximate height based on typical character illustration proportions
          className="absolute object-contain z-10 
                               w-[150px] top-[-50px] right-3 
                               sm:w-[320px] sm:top-[-54px] sm:right-0 
                               md:w-[500px] md:right-[60px]"
        />

        <div className="relative z-20 container mt-4 sm:mt-7 mx-0 px-0">
          {" "}
          <div className="inline-flex items-center justify-center px-[20px] py-[6px] bg-[#ffffff33] rounded-full">
            <span className="font-figtree font-[700]  text-white text-sm sm:text-[16px]">Highlight</span>
          </div>
          {/* Heading & description */}
          <div className="flex flex-col w-full max-w-full md:max-w-[499px] gap-3 sm:gap-4 mt-2 sm:mt-1">
            <h2 className="font-figtree font-bold text-white text-[28px] sm:text-[32px] md:text-[48px] leading-tight sm:leading-snug">
              Subscribe to our
              <br />
              Blogs for updates
            </h2>
            <p className="font-figtree font-[400] text-white text-sm sm:text-base md:text-[18px] leading-relaxed sm:leading-normal">
              Stay informed with the latest news, insights, and updates delivered straight to your inbox
            </p>
          </div>
          {/* Email input + submit button */}
          <div className="flex flex-col w-full max-w-full md:max-w-[497px] gap-4 mt-6 md:mt-8 lg:mt-12">
            <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-4 w-full">
              {/* Email Box */}
              <div className="flex items-center w-full md:w-[358px] rounded-[72px] border border-[#ffffff66] px-3 md:px-[18px] md:py-[16px] gap-1">
                <Mail className="w-5 h-5 text-[#ffffff99] flex-shrink-0" />
                <input
                  type="email"
                  className="appearance-none border-none outline-none ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0 hover:border-none hover:ring-0 shadow-none bg-transparent font-roboto font-medium text-[#ffffffcc] text-base placeholder:text-[#ffffffcc] p-0 h-auto w-full"
                  placeholder="Email address"
                />
              </div>

              {/* Submit Button */}
              <Button className="w-full md:w-auto h-[50px] md:h-[54px] px-6 md:px-8 py-3 md:py-4 bg-white hover:bg-gray-100 rounded-[80px] font-figtree font-bold text-[#3891DEC4] text-base sm:text-lg flex-shrink-0">
                Submit
              </Button>
            </div>
          </div>
          {/* Terms */}
          <div className="flex items-center mt-4 gap-2 w-full max-w-md sm:max-w-none md:w-auto h-auto">
            {/* Circular Checkbox */}
            <label className="relative inline-block w-[18px] h-[18px]">
              <input
                type="checkbox"
                className="peer appearance-none w-full h-full rounded-full border border-white bg-transparent checked:bg-white checked:border-[#3890DE] cursor-pointer"
              />
              <span
                className="pointer-events-none absolute inset-0 flex items-center justify-center text-[#3890DE] text-[13px] font-bold opacity-0 peer-checked:opacity-100"
              >
                ✔
              </span>
            </label>

            {/* Single-line Text */}
            <label
              htmlFor="terms-checkbox"
              className="font-figtree font-[400] text-white text-xs sm:text-sm md:text-[18px] leading-snug sm:leading-[120%] cursor-pointer"
            >
              I agree with the{" "}
              <span className="underline underline-offset-2 decoration-solid">Terms and condition</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionBanner

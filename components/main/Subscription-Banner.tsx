import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const SubscriptionBanner = () => {
  return (
    <div className="w-full flex justify-center mb-20 px-4">
      <div className="relative w-full max-w-[1193px] bg-[#3890dec4] rounded-3xl px-6 py-8 md:px-20 md:py-10 overflow-visible">
        
        {/* Image that exceeds the banner from the top */}
        <img
          src="/images/banner-img.png"
          alt="Banner Character"
          className="absolute md:top-[-50px] top-[-20px] right-6 md:right-10 w-[130px] sm:w-[500px] object-contain z-20"
        />

        {/* Highlight badge */}
        <div className="inline-flex items-center justify-center px-5 py-2 bg-[#ffffff33] rounded-[66px]">
          <span className="font-['Figtree',Helvetica] font-bold text-white text-base">
            Highlight
          </span>
        </div>

        {/* Heading & description */}
        <div className="flex flex-col w-full max-w-[499px] gap-4 mt-6">
          <h2 className="font-['Figtree',Helvetica] font-bold text-white text-2xl md:text-5xl leading-snug">
            Subscribe to our
            <br />
            Blogs for updates
          </h2>
          <p className="font-['Figtree',Helvetica] font-normal text-white text-lg leading-normal">
            Stay informed with the latest news, insights, and updates
            delivered straight to your inbox
          </p>
        </div>

        {/* Input + Button + Terms */}
        <div className="flex flex-col w-full max-w-[497px] gap-4 mt-6 md:mt-16">
          <div className="flex flex-col md:flex-row items-center gap-4 w-full">
            <div className="flex items-center gap-2.5 pl-[18px] pr-8 py-4 w-full max-w-[358px] rounded-[72px] border border-solid border-[#ffffff66]">
              <div className="w-5 h-5 bg-[url(/sms-notification.png)] bg-[100%_100%]" />
              <Input
                className="border-none bg-transparent font-['Roboto',Helvetica] font-medium text-[#ffffff99] text-lg leading-normal placeholder:text-[#ffffff99] focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Email address"
              />
            </div>
            <Button className="px-8 py-4 bg-white rounded-[80px] font-['Figtree',Helvetica] font-bold text-[#3890dec4] text-lg w-full md:w-auto">
              Submit
            </Button>
          </div>

          {/* Terms and conditions */}
          <div className="flex items-center gap-2">
            <img className="w-6 h-6" alt="Tick" src="/images/banner-img-1.png" />
            <p className="font-['Figtree',Helvetica] font-normal text-white text-lg leading-normal">
              I agree with the <span className="underline">Terms and condition</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionBanner

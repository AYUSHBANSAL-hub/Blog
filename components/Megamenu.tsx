"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Gem } from "lucide-react"
import Link from "next/link"

const MegaMenuContent = () => {
  return (
    <div className="bg-white shadow-xl w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
          {/* Column 1 */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-neutral-800">Lorem ipsum dolor sit amet consectetur.</h2>
              <p className="mt-2 text-sm text-neutral-600">Discover our innovative solutions and drive your success.</p>
            </div>
            <Link href="#" passHref>
              <Button
                variant="outline"
                className="mt-6 w-full rounded-3xl md:w-auto justify-center bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 group"
              >
                Explore More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-medium text-neutral-800">Lorem ipsum</h3>
            <p className="mt-1 text-sm text-neutral-500">Lorem ipsum dolor sit amet consectetur.</p>
            <ul className="mt-4 space-y-3">
              {[1, 2, 3].map((i) => (
                <li key={i} className="flex items-center">
                  <Link href="#" className="flex items-center group">
                    <img src='/images/star.svg'className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span className="text-sm text-neutral-700 group-hover:text-blue-600 transition-colors">
                      Lorem ipsum
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-medium text-neutral-800">Lorem ipsum</h3>
            <p className="mt-1 text-sm text-neutral-500">Lorem ipsum dolor sit amet consectetur.</p>
            <ul className="mt-4 space-y-3">
              {[1, 2, 3].map((i) => (
                <li key={i} className="flex items-center">
                  <Link href="#" className="flex items-center group">
                    <img src='/images/star.svg'className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span className="text-sm text-neutral-700 group-hover:text-blue-600 transition-colors">
                      Lorem ipsum
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MegaMenuContent

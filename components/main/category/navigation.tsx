import { ChevronRightIcon, HomeIcon } from "lucide-react";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Props {
  items: { label: string; href: string }[];
  onBreadcrumbClick?: (index: number) => void;
}

const NavigationBreadcrumbSection = ({ items, onBreadcrumbClick }: Props) => {
  return (
    <nav className="flex w-fit mt-16 ml-16 items-start p-0.5 overflow-x-auto">
      <Breadcrumb className="h-12 w-full">
        <BreadcrumbList className="flex items-center">
          <BreadcrumbItem>
            <BreadcrumbLink
              href="#"
              onClick={() => onBreadcrumbClick?.(0)}
              className="flex items-center w-12 h-12"
            >
              <HomeIcon className="w-4 h-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>

          {items.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbSeparator>
                <ChevronRightIcon className="w-4 h-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="#"
                  onClick={() => onBreadcrumbClick?.(index + 1)}
                  className="px-3 text-[#1a73e8] text-sm font-medium leading-[48px] whitespace-nowrap"
                >
                  {item.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
};

export default NavigationBreadcrumbSection;

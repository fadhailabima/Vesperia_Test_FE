"use client";

import React from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import useScroll from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

const Header = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
        {
          "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
          "border-b border-gray-200 bg-white": selectedLayout,
        }
      )}
    >
      <div className="flex h-[55px] items-center justify-between px-4 md:px-8">
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-xs md:text-sm lg:text-base text-red-600">
            Vesperia - Internship Test
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-xs md:text-sm lg:text-base text-red-600">
            Fadhail Athaillah Bima
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;

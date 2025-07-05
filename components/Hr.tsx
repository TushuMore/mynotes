import { cn } from "@/lib/utils";
import React from "react";

const Hr = ({ className }: { className: string }) => {
  return (
    <div
      className={cn(
        `w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent`,
        className
      )}
    ></div>
  );
};

export default Hr;

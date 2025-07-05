import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const LinkButton = ({
  linkPath,
  linkName,
}: {
  linkPath: string;
  linkName: string;
}) => {
  return (
    <div>
      <Link
        href={linkPath}
        className={cn(
          "px-5 py-[8px] bg-primary text-sm font-semibold text-primary-foreground rounded-sm cursor-pointer hover:text-background shadow-xs"
        )}
      >
        {linkName}
      </Link>
    </div>
  );
};

export default LinkButton;

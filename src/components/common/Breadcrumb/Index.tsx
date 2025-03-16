"use client";

import React from "react";
import { usePathname } from "next/navigation";

const CustomBreadcrumb = () => {
  const pathname = usePathname() || "";
  const pathNames = pathname.split("/").filter(Boolean);

  return (
    <div className="bg-gray-300 px-4 py-2 rounded-md text-lg font-semibold text-black mb-4">
      {pathNames
        .map(
          (link, index) => link.charAt(0).toUpperCase() + link.slice(1) // Capitalize
        )
        .join(" > ")}{" "}
      {/* Join paths with '>' */}
    </div>
  );
};

export default CustomBreadcrumb;

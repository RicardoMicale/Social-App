import React from 'react';

export default function LoaderIcon({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        d="M12 3v4m6.364-1.364l-2.829 2.828M21 12h-4m1.364 6.364l-2.829-2.829M12 17v4m-3.536-5.464l-2.828 2.828M7 12H3m5.464-3.535L5.636 5.636"
      ></path>
    </svg>
  );
}

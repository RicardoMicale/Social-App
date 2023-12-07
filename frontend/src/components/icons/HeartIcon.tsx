import React from 'react';

function HeartIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
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
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11.993 5.156c-2-2.36-5.333-2.994-7.838-.834s-2.858 5.772-.89 8.327c1.635 2.125 6.585 6.605 8.207 8.055.182.162.272.243.378.275a.499.499 0 00.286 0c.106-.032.197-.113.378-.275 1.623-1.45 6.573-5.93 8.208-8.055 1.967-2.555 1.658-6.19-.89-8.327-2.549-2.137-5.84-1.525-7.839.834z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default HeartIcon;

import React from 'react';

function CheckIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
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
        d="M20 7L9.707 17.293a1 1 0 01-1.414 0L4 13"
      ></path>
    </svg>
  );
}

export default CheckIcon;

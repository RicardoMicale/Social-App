import React from 'react';

function ArrowRightIcon({
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
        d="M5 12h13m-5-6l5.293 5.293a1 1 0 010 1.414L13 18"
      />
    </svg>
  );
}

export default ArrowRightIcon;

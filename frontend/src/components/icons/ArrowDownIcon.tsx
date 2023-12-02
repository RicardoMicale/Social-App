import React from 'react';

function ArrowDownIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
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
        d="M12 5v13m6-5l-5.293 5.293a1 1 0 01-1.414 0L6 13"
      ></path>
    </svg>
  );
}

export default ArrowDownIcon;

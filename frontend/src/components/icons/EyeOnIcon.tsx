import React from 'react';

function EyeOnIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
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
        strokeWidth="2"
        d="M2.91 13.172a2.808 2.808 0 010-2.344A10.002 10.002 0 0112 5c4.034 0 7.51 2.388 9.091 5.828.342.743.342 1.6 0 2.344A10.002 10.002 0 0112.001 19c-4.034 0-7.51-2.388-9.091-5.828z"
      ></path>
      <path
        stroke="currentColor"
        strokeWidth="2"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      ></path>
    </svg>
  );
}

export default EyeOnIcon;

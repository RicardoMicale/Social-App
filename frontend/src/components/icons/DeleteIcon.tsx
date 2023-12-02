import React from 'react';

function DeleteIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 18"
      className={className}
      {...props}
    >
      <path
        fill="#currentColor"
        d="M3 4.833h-.833v10.834a1.667 1.667 0 001.666 1.666h8.334a1.667 1.667 0 001.666-1.666V4.833H3zm3.333 10H4.667v-7.5h1.666v7.5zm5 0H9.667v-7.5h1.666v7.5zm.515-12.5L10.5.667h-5L4.152 2.333H.5V4h15V2.333h-3.652z"
      />
    </svg>
  );
}

export default DeleteIcon;

import React from 'react';

function WarningIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 26 22"
      className={className}
      {...props}
    >
      <path
        fill="currentColor"
        d="M25.132 20.406L13.757.72A.865.865 0 0013 .28a.862.862 0 00-.758.438L.868 20.406a.875.875 0 00.757 1.313h22.75a.875.875 0 00.757-1.313zM12.125 8.375a.22.22 0 01.219-.219h1.312a.22.22 0 01.219.219v5.031a.22.22 0 01-.219.219h-1.312a.22.22 0 01-.219-.219V8.375zM13 18a1.313 1.313 0 010-2.625A1.313 1.313 0 0113 18z"
      />
    </svg>
  );
}

export default WarningIcon;

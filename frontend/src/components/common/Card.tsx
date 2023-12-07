import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div className="bg-misc-white shadow-custom rounded-md py-6 px-8 w-full">
      {children}
    </div>
  );
}

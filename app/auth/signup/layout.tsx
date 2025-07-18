import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function SignupLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full">
      {children}
    </div>
  );
}
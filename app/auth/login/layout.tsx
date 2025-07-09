// D:\Project\Project Magang BAKESBANGPOL\Frontend\indomas\app\(user)\home\layout.tsx
import { ReactNode } from "react";


interface DashboardLayoutProps {
  children: ReactNode;
}

const LoginLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="text-white min-h-screen w-full relative">
      {children} 
      
    </div>
  );
};

export default LoginLayout;
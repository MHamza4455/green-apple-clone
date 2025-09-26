import React from "react";

interface StandardLayoutProps {
  children: React.ReactNode;
}

export const StandardLayout: React.FC<StandardLayoutProps> = ({ children }) => {
  return <div className="min-h-screen bg-white">{children}</div>;
};

export default StandardLayout;

import React from "react";
import { WhatsAppFloat } from "./WhatsAppFloat";

interface StandardLayoutProps {
  children: React.ReactNode;
}

export const StandardLayout: React.FC<StandardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      {children}
      <WhatsAppFloat phoneNumber="+971547861293" />
    </div>
  );
};

export default StandardLayout;

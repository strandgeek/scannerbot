import React, { FC } from "react";
import LogoSrc from "../assets/scannerbot-logo.png";

export interface TermLayoutProps {
  children: React.ReactNode;
}

export const TermLayout: FC<TermLayoutProps> = ({ children }) => {
  return (
    <div className="max-w-3xl mx-auto shadow-sm border p-12 m-8">
      <div className="my-8">
        <img src={LogoSrc} className="h-12 w-auto" alt="Scannerbot" />
      </div>
      <div className="prose">{children}</div>
    </div>
  );
};

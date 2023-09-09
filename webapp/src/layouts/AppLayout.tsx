import React, { FC } from 'react'

export interface AppLayoutProps {
  title?: string;
  children?: React.ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}

import React, { FC } from 'react'

export interface WebsiteLayoutProps {
  title?: string;
  children?: React.ReactNode;
}

export const WebsiteLayout: FC<WebsiteLayoutProps> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}

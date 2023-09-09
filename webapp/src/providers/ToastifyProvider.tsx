import React, { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export interface ToastifyProviderProps {
  children: React.ReactNode;
}

export const ToastifyProvider: FC<ToastifyProviderProps> = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  )
}

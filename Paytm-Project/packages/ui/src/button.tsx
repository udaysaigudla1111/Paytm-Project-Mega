"use client";
import { ReactNode } from "react";

interface IButton{
  children:ReactNode,
  onClick:any,
  bgColor:string
}

export const Button = ({children,onClick,bgColor}:IButton) => {
  return (
    <div>
      <button className={`text-white ${bgColor} hover:scale-[1.03] active:scale-[0.98] duration-75 transition-all font-medium rounded-lg text-sm px-5 py-2.5`}
      onClick={onClick}>
      {children}
    </button>
    </div>
    
  );
};

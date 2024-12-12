import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div className={`card w-full shadow-md bg-base-200 items-start p-4 ${className}`}>
      {children}
    </div>
  );
}

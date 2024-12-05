import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div className={`card w-full shadow-md bg-white items-start p-4 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
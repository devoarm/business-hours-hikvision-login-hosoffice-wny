import React from "react";

function Card({ children }: { children: React.ReactNode }) {
  return <div className="flex m-5 bg-white rounded-sm p-5">{children}</div>;
}

export default Card;

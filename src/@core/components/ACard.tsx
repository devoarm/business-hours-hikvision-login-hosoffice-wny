import React from "react";
type Props = {
  children?: React.ReactNode;
  className?: string;
};
function ACard({ children, className }: Props) {
  return (
    <div className={`bg-white p-5 m-2 rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
}

export default ACard;

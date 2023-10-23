import { colors } from "@/config/theme/color";
import React from "react";
type Props = {
  children: React.ReactNode;
  active?: boolean;
  handleClick?: () => {};
};
function ButtonMenu({ children, active = false, handleClick }: Props) {
  return (
    <button
      className={`${
        active ? "bg-[#48a1d0]" : ""
      } mr-3 p-2 rounded-md hover:bg-slate-300`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default ButtonMenu;

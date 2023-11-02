import { colors } from "@/config/theme/color";
import { Button } from "antd";
import { ButtonHTMLType } from "antd/es/button";
import { BaseButtonProps } from "antd/es/button/button";
import { SizeType } from "antd/es/config-provider/SizeContext";
import React, { ButtonHTMLAttributes } from "react";
type MergedHTMLAttributes = Omit<
  React.HTMLAttributes<HTMLElement> &
    React.ButtonHTMLAttributes<HTMLElement> &
    React.AnchorHTMLAttributes<HTMLElement>,
  "type"
>;
interface AButtonProps extends BaseButtonProps, MergedHTMLAttributes {
  children: React.ReactNode;
  href?: string;
  htmlType?: ButtonHTMLType;
  size?: SizeType;
  color?:
    | "primary"
    | "secondary"
    | "violet"
    | "congo"
    | "success"
    | "warning"
    | "danger"
    | "dark"
    | "info"
    | "black"
    | "grey1"
    | "grey2"
    | "grey3"
    | "light"
    | "white";
}

const AButton: React.FC<AButtonProps> = ({
  children,
  href,
  htmlType,
  className,
  onClick,
  color = "primary",
  size = "large",
}) => {
  return (
    <Button
      onClick={onClick}
      htmlType={htmlType}
      className={className}
      size={size}
      type="primary"
      style={{ backgroundColor: `${colors?.[`${color}`]}` }}
    >
      {children}
    </Button>
  );
};

export default AButton;

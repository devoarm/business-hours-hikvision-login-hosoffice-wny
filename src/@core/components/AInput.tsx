import { colors } from "@/config/color";
import { Button, Input, InputProps, InputRef } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import React, { ButtonHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

type Props = {
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  error?: FieldError | undefined;
  size?: SizeType;
  onBlur?: () => void;
  onChange?: () => void;
  value?: any;
  ref?: any;
};

const AInput = ({
  error,
  placeholder,
  disabled = false,
  name,
  size = "large",
  onBlur,
  onChange,
  value = "",
  ref,
}: Props) => {
  return (
    <Input
      className={`${error ? "placeholder:text-red-400" : ""}`}
      placeholder={placeholder}
      disabled={disabled}
      status={error?.message ? "error" : ""}
      name={name}
      size={size}
      onBlur={onBlur}
      onChange={onChange}
      value={`${value}`}
      ref={ref}
    />
  );
};

export default AInput;

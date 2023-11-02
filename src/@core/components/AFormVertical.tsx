import { Typography } from "antd";
import React from "react";
import { FieldError } from "react-hook-form";
const { Text } = Typography;

type Props = {
  error?: FieldError | undefined |null
  title: string;
  children: React.ReactNode;
};
function AFormVertical({ error, title, children }: Props) {
  return (
    <div>
      <Typography className={`mb-2 ${error ? "text-red-500" : ""}`}>
        {title}
      </Typography>
      {children}
      <Text italic className={`mb-1 ${error ? "text-red-500" : ""}`}>
        {error?.message}
      </Text>
    </div>
  );
}

export default AFormVertical;

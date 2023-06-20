import React from "react";

const Button = ({
  btFull = true,
  onClick = "",
  type = "button",
  className,
  children,
  bgColor,
  ...props
}) => {
  let bgClassName = "bg-purple-700";
  return (
    <button
      type={type}
      onClick={onClick}
      className={` px-6 py-4 mt-auto text-lg font-medium capitalize rounded-lg ${
        btFull ? "w-full" : ""
      } ${bgClassName} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

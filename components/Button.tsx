import React from "react";
import classNames from "classnames";

interface BtnProps {
  tag?: React.ElementType;
  size: "sm" | "md" | "lg";
  children: React.ReactNode;
  color: "primary" | "secondary" | "danger";
  className: string;
  width?: string;
  loading: boolean;
  [x: string]: any;
}

const Button = React.forwardRef(
  (
    {
      children,
      tag,
      color = "primary",
      className = "",
      size = "md",
      width,
      loading,
      ...restProps
    }: BtnProps,
    ref
  ) => {
    let Tag = tag ? tag : "button";

    const btnClassName = classNames(
      `flex items-center justify-center outline-none disabled:opacity-70 disabled:cursor-not-allowed ${className}`,
      {
        "text-sm py-3 px-6 rounded-lg": size === "md",
        " text-[10px] p-2 py-1 rounded-sm": size === "sm",
        "bg-primary text-white": color === "primary",
        "bg-red-500 text-white": color === "danger",
        "bg-gray-200 dark:bg-gray-500": color === "secondary",
        "w-full": width === "full",
      }
    );

    return (
      <Tag {...restProps} className={btnClassName} ref={ref}>
        {loading && (
          <>
            <span className=" w-5 h-5 border-4 border-gray-200 border-b-transparent rounded-full animate-spin"></span>
            <span className="pl-4"> Processing...</span>
          </>
        )}
        {!loading && children}
      </Tag>
    );
  }
);

Button.displayName = "Button";

export default Button;

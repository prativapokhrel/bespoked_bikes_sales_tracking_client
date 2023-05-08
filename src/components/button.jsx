import clsx from "clsx";
import * as React from "react";
import Spinner from "./spinner";

const Button = React.forwardRef((props, ref) => {
  const {
    label,
    buttonType = "primary",
    type = "button",
    loading = false,
    disabled = false,
    fullWidth = true,
    iconLeft,
    iconRight,
    icon,
    iconClassName = "",
    className = "",
    ...rest
  } = props;
  let btnClassName = "";
  switch (buttonType) {
    case "primary":
      btnClassName =
        "text-white bg-purple-500 hover:bg-purple-600 focus:ring-purple-500";
      break;
    case "secondary":
      btnClassName =
        " bg-darkGray hover:bg-gray-300  focus:ring-darkGray text-purple-500";
      break;

    case "danger":
      btnClassName =
        "text-white bg-red-500 hover:bg-red-600 focus:ring-red-500";
      break;
    case "link":
      btnClassName =
        "text-purple-600 bg-transparent justify-start focus:text-red-500 underline text-xs font-medium normal-case focus:ring-white";
      break;
    case "icon":
      btnClassName =
        "text-gray-900  bg-transparent justify-start  p-0 w-auto  ";
      break;
    default:
      btnClassName =
        "text-white bg-purple-500 hover:bg-green-600 focus:ring-purple-500";
      break;
  }
  return (
    <div
      className={clsx(
        buttonType === "icon" ? "flex justify-evenly  " : "w-full  py-1"
      )}
    >
      <button
        ref={ref}
        type={type}
        disabled={loading || disabled}
        className={clsx(
          fullWidth ? "w-full" : "w-auto ",
          "group relative flex  items-center justify-center rounded-md border border-transparent text-sm font-medium uppercase focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          buttonType === "link" || buttonType === "icon" ? "p-0" : "py-2 px-4",

          btnClassName,
          className
        )}
        {...rest}
      >
        {loading && <Spinner />}
        {iconLeft &&
          React.cloneElement(iconLeft, { className: "-ml-0.5 mr-2 h-5 w-5" })}
        {icon &&
          React.cloneElement(icon, {
            className: clsx(iconClassName ? iconClassName : " h-5 w-5  "),
          })}
        {label}
        {iconRight &&
          React.cloneElement(iconRight, {
            className: "ml-2 -mr-0.5 h-4 w-4",
          })}
      </button>
    </div>
  );
});

Button.displayName="Button"
export default Button;

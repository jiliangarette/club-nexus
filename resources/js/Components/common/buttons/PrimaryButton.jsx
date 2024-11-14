import React from "react";

const PrimaryButton = React.forwardRef(
  ({ className = "", disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={
          `inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-lg  text-sm font-extrabold tracking-normal text-slate-900 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2 transition ease-in-out duration-150 ` +
          (disabled ? "opacity-25" : "") +
          ` ${className}`
        }
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
);

export default PrimaryButton;

import React from "react";

const Loading = ({ size = "md" }) => {
  const sizeVariants = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-4",
  };

  if (!sizeVariants[size]) {
    console.warn(`Invalid size prop: ${size}. Using default 'md'.`);
  }

  const loaderSize = sizeVariants[size] || sizeVariants["md"];

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${loaderSize} border-t-transparent border-slate-400 rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

export default Loading;

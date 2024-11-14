import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextAreaInput(
  { className = "", isFocused = false, ...props },
  ref
) {
  const input = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <textarea
      {...props}
      className={
        "border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-slate-500 dark:focus:border-slate-600 focus:ring-slate-500 dark:focus:ring-slate-600 rounded-md shadow-sm " +
        className
      }
      ref={input}
    ></textarea>
  );
});

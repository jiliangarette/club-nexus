export default function SecondaryButton({
  type = "button",
  className = "",
  disabled,
  children,
  ...props
}) {
  return (
    <button
      {...props}
      type={type}
      className={
        `inline-flex items-center px-4 py-2 bg-slate-100 border border-slate-300 dark:border-slate-500 rounded-xl font-bold text-sm text-slate-700   tracking-normal shadow-sm hover:bg-slate-100  focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2  disabled:opacity-25 transition ease-in-out duration-150 ${
          disabled && "opacity-25"
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}

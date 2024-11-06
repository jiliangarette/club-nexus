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
        `inline-flex items-center px-4 py-2 bg-shade border border-gray-300 dark:border-gray-500 rounded-xl font-bold text-sm text-gray-700   tracking-normal shadow-sm hover:bg-blue-100  focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2  disabled:opacity-25 transition ease-in-out duration-150 ${
          disabled && "opacity-25"
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}

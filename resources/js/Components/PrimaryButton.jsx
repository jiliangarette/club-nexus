export default function PrimaryButton({
  className = "",
  disabled,
  children,
  ...props
}) {
  return (
    <button
      {...props}
      className={
        `inline-flex items-center px-4 py-2 bg-button border border-transparent rounded-xl font-semibold text-xs text-gray-800  uppercase tracking-widest hover:opacity-90 focus:bg-shade active:bg-shade focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2  transition ease-in-out duration-150 ${
          disabled && "opacity-25"
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}

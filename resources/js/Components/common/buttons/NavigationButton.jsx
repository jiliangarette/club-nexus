export default function NavigationButton({
  type = "button",
  className = "",
  disabled,
  active = false,
  children,
  ...props
}) {
  return (
    <button
      {...props}
      type={type}
      className={`inline-flex items-center px-2 py-2 rounded-md font-bold text-sm tracking-normal
          active:scale-90 disabled:opacity-25
         hover:bg-slate-200 transition-all duration-300 ease-in-out flex-col sm:flex-row relative
        ${active ? " text-black" : " text-slate-600"}
        ${disabled && "opacity-25"}
        ${className}`}
      disabled={disabled}
    >
      {children}
      {active && (
        <div className="h-[2px] bg-black rounded-full mx-auto sm:hidden absolute bottom-0 left-0 right-0 w-[30px]"></div>
      )}
    </button>
  );
}

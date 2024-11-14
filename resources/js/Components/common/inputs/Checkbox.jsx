export default function Checkbox({ className = "", ...props }) {
  return (
    <input
      {...props}
      type="checkbox"
      className={
        "rounded dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-600 shadow-sm focus:ring-slate-500 dark:focus:ring-slate-600 dark:focus:ring-offset-slate-800 " +
        className
      }
    />
  );
}

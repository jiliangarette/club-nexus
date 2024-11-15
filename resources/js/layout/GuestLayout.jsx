import ApplicationLogo from "@/Components/common/utilities/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center pt-6 sm:pt-0 bg-slate-50 dark:bg-slate-900">
      <div className="flex flex-col place-items-center">
        <div>
          <Link className="flex items-center font-extrabold" href="/">
            <ApplicationLogo className="w-20 h-20 fill-current text-slate-500" />
            <div className="pt-2 text-xl -ml-[7px]">EXUS</div>
          </Link>
        </div>

        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-slate-800 shadow-md overflow-hidden rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
}

import ApplicationLogo from "@/Components/ApplicationLogo";
import CommunicationLogo from "@/Components/CommunicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center pt-6 sm:pt-0 bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col place-items-center">
        <div>
          <Link className="flex items-center font-extrabold" href="/">
            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
            <div className="pt-2 text-xl -ml-[7px]">EXUS</div>
          </Link>
        </div>

        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
}

import { Link, usePage } from "@inertiajs/react";
import PrimaryButton from "../PrimaryButton";
import { route } from "ziggy-js";

const DefaultHomeDisplay = () => {
  const page = usePage();
  const name = page.props.auth.user.name;
  const firstName = name.split(" ")[0];

  return (
    <div className=" w-full h-full flex flex-col sm:justify-center py-20 sm:py-0 place-items-center gap-12 ">
      <div className="flex flex-col  place-content-center ">
        <h1 className="text-3xl font-semibold "> Welcome, {firstName}</h1>
        <div className="font-extrabold text-sm text-gray-700 tracking-tighter">
          Ready? Set. Connect! Let's jump right into things.
        </div>
      </div>
      <div className="flex gap-1 max-w-[700px] w-full sm:px-2 px-4 sm:flex-row flex-col">
        <div className="w-full sm:h-76 sm:w-1/3 justify-between py-4 rounded-lg  flex flex-col place-items-center gap-3 ">
          <div>
            <img
              src="./img/chat.png"
              className="object-contain  w-full h-auto px-2"
            />
          </div>
          <div className="flex flex-col place-items-center gap-2 px-8">
            <div className="font-semibold tracking-tighter text-sm text-gray-600 leading-tight">
              Send a message to a colleague or friend
            </div>
            <div>
              <Link href={route("chat")}>
                <PrimaryButton className="text-[11px] px-5 py-[6px]">
                  Start a chat
                </PrimaryButton>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full sm:h-76 sm:w-1/3 justify-between py-4 rounded-lg  flex flex-col place-items-center gap-3 ">
          <div>
            <img
              src="./img/notifiication.png"
              className="object-contain  w-full h-auto px-2"
            />
          </div>
          <div className="flex flex-col place-items-center gap-2 px-8">
            <div className="font-semibold tracking-tighter text-sm text-gray-600 leading-tight">
              Never miss an important update or event announcement.
            </div>
            <div>
              <Link href={route("feed")}>
                <PrimaryButton className="text-[11px] px-5 py-[6px] text-nowrap">
                  Explore announcements
                </PrimaryButton>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full sm:h-76 sm:w-1/3 justify-between py-4 rounded-lg  flex flex-col place-items-center gap-3 ">
          <div>
            <img
              src="./img/browse.png"
              className="object-contain  w-full h-auto px-2"
            />
          </div>
          <div className="flex flex-col place-items-center gap-2 px-8">
            <div className="font-semibold tracking-tighter text-sm text-gray-600 leading-tight">
              Stay in the loop with the latest updates from your community.
            </div>
            <div>
              <Link href={route("chat")}>
                <PrimaryButton className="text-[11px] px-5 py-[6px]">
                  Browse feed
                </PrimaryButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DefaultHomeDisplay;

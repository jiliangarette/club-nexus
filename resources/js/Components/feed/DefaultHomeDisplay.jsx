import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { Button } from "../ui/button";
import ImageSkeleton from "../Loading/ImageSkeleton";

const DefaultHomeDisplay = () => {
  const page = usePage();
  const name = page.props.auth.user.name;
  const firstName = name.split(" ")[0];

  const [isImageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="w-full h-full flex flex-col sm:justify-center py-20 sm:py-0 place-items-center gap-12">
      <div className="flex flex-col place-content-center">
        <h1 className="text-3xl font-semibold text-center">
          Welcome, {firstName}
        </h1>
        <div className="font-extrabold text-sm text-slate-700 tracking-tighter">
          Ready? Set. Connect! Let's jump right into things.
        </div>
      </div>

      <div className="flex gap-1 sm:max-w-[700px] w-full sm:px-2 px-4 sm:flex-row flex-col place-items-center sm:place-items-end">
        <div className="w-2/3 sm:h-76 sm:w-1/3 justify-between py-4 rounded-lg flex flex-col place-items-center sm:gap-3">
          <div>
            {!isImageLoaded && <ImageSkeleton />}
            <img
              src="./img/chat.png"
              className={`object-contain w-full h-auto px-2 ${
                isImageLoaded ? "" : "hidden"
              }`}
              alt="Chat"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="flex flex-col place-items-center gap-2 px-8">
            <div className="font-semibold tracking-tighter text-[12px] text-slate-600 leading-tight text-center">
              Send a message to a colleague or friend
            </div>
            <div>
              <Link href={route("chat")}>
                <Button size="sm" className="text-[11px] px-5">
                  Start a chat
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-2/3 sm:h-76 sm:w-1/3 justify-between py-4 rounded-lg flex flex-col place-items-center sm:gap-3">
          <div>
            {!isImageLoaded && <ImageSkeleton />}
            <img
              src="./img/notifiication.png"
              className={`object-contain w-full h-auto px-2 ${
                isImageLoaded ? "" : "hidden"
              }`}
              alt="Notification"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="flex flex-col place-items-center gap-2 px-8">
            <div className="font-semibold tracking-tighter text-[12px] text-slate-600 leading-tight text-center">
              Never miss an important update or event announcement.
            </div>
            <div>
              <Link href={route("feed")}>
                <Button size="sm" className="text-[11px] px-5 text-nowrap">
                  Explore announcements
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-2/3 sm:h-76 sm:w-1/3 justify-between py-4 rounded-lg flex flex-col place-items-center sm:gap-3">
          <div>
            {!isImageLoaded && <ImageSkeleton />}
            <img
              src="./img/browse.png"
              className={`object-contain w-full h-auto px-2 ${
                isImageLoaded ? "" : "hidden"
              }`}
              alt="Browse"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="flex flex-col place-items-center gap-2 px-8">
            <div className="font-semibold tracking-tighter text-[12px] text-slate-600 leading-tight text-center">
              Stay in the loop with the latest updates from your community.
            </div>
            <div>
              <Link href={route("chat")}>
                <Button size="sm" className="text-[11px] px-5">
                  Browse feed
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultHomeDisplay;

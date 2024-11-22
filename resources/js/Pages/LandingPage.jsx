import ApplicationLogo from "@/Components/common/utilities/ApplicationLogo";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import React from "react";

export default function LandingPage() {
  return (
    <>
      <div className="w-screen h-screen overflow-hidden flex flex-col  bg-slate-100">
        <section className="hero h-full flex flex-col items-center justify-between text-slate-900 py-16 sm:py-10 px-4">
          <div className=" w-full max-w-sm sm:max-w-4xl ">
            <Link href="/" className="flex items-center ">
              <ApplicationLogo className="block h-9 w-auto fill-current text-slate-800 dark:text-slate-200" />
              <div className="pt-2 font-extrabold  -mx-1"> EXUS</div>
            </Link>
          </div>
          <div className="flex flex-col Place-items-start max-w-sm sm:max-w-4xl mx-auto w-full ">
            <h1 className="text-4xl font-extrabold mb-2">
              A Place for Meaningful Engagement
            </h1>
            <h3 className="text-lg mb-8 text-slate-500">
              Connect with friends, classmates, and others. Build your community
              and explore shared interests.
            </h3>
            <Link href={route("login")}>
              <Button size="lg">Login to Club Nexus</Button>
            </Link>
          </div>

          <div className="w-full flex sm:justify-center  space-x-8 py-4 px-2 ">
            <div className="flex-none text-center sm:p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 ease-in-out hover:scale-105 w-72 p-2">
              <img
                src="./img/browse.png"
                alt="Browse Clubs"
                className="w-32 mx-auto mb-4"
              />
              <h2 className="text-2xl font-semibold text-slate-900">
                Browse Clubs
              </h2>
              <p className="text-slate-600 mt-2">
                Explore various clubs, join discussions, and stay updated with
                the latest events.
              </p>
            </div>
            <div className="flex-none text-center sm:p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 ease-in-out hover:scale-105 w-72 p-2">
              <img
                src="./img/chat.png"
                alt="Group Chat"
                className="w-32 mx-auto mb-4"
              />
              <h2 className="text-2xl font-semibold text-slate-900">
                Group Chat
              </h2>
              <p className="text-slate-600 mt-2">
                Engage in real-time chats with club members for better
                collaboration.
              </p>
            </div>
            <div className="flex-none text-center sm:p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 ease-in-out hover:scale-105 w-72 p-2">
              <img
                src="./img/notifiication.png"
                alt="Event Announcements"
                className="w-32 mx-auto mb-4"
              />
              <h2 className="text-2xl font-semibold text-slate-900">
                Event Announcements
              </h2>
              <p className="text-slate-600 mt-2">
                Stay informed with the latest announcements and events within
                your club.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

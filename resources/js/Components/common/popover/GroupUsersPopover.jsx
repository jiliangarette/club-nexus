import { Popover, Transition } from "@headlessui/react";
import { Link } from "@inertiajs/react";
import { Fragment } from "react";
import UserAvatar from "../avatars/UserAvatar";
import { route } from "ziggy-js";
import { UsersRound } from "lucide-react";

export default function GroupUsersPopover({ users = [], text, size }) {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`${
              open ? " text-black font-semibold" : "text-slate-900"
            } hover:text-slate-800 flex place-items-center gap-2 outline-none`}
          >
            <UsersRound size={size} />
            {text}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-in duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className=" right-0 z-20 mt-3 w-[200px] max-w-sm  px-4 sm:px-0 fixed sm:absolute">
              <div className="bg-slate-100 rounded-lg py-2">
                {users.map((user) => (
                  <Link
                    href={route("chat.user", user.id)}
                    key={user.id}
                    className="flex items-center py-2 gap-2 px-3 hover:bg-slate-100 "
                  >
                    <UserAvatar user={user} />
                    <div className="text-xs">{user.name}</div>
                  </Link>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

import { Popover, Transition } from "@headlessui/react";
import { UsersIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";
import { Fragment } from "react";
import UserAvatar from "./UserAvatar";
import { route } from "ziggy-js";

export default function GroupUsersPopover({ users = [] }) {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`${
              open ? "text-gray-200" : "text-gray-400"
            } hover:text-gray-200 `}
          >
            <UsersIcon className="w-4" />
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
            <Popover.Panel className="absolute right-0 z-20 mt-3 w-[200px] max-w-sm  px-4 sm:px-0 ">
              <div className="bg-gray-800 py-2">
                {users.map((user) => (
                  <Link
                    href={route("chat.user", user.id)}
                    key={user.id}
                    className="flex items-center py-2 gap-2 px-3 hover:bg-black/30 "
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

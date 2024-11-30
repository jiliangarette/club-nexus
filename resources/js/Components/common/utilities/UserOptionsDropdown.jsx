import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

import axios from "axios";
import { useEventBus } from "@/EventBus";
import {
  EllipsisVertical,
  Lock,
  LockOpen,
  ShieldCheck,
  User,
  UserCog,
} from "lucide-react";

export default function UserOptionsDropdown({ conversation }) {
  const { emit } = useEventBus();

  const changeUserRole = () => {
    if (!conversation.is_user) {
      return;
    }

    axios
      .post(route("user.changeRole", conversation.id))
      .then((res) => {
        emit("toast.show", res.data.message);
      })
      .catch((err) => {
        alert("error toast");
        console.error(err);
      });
  };

  const toggleModeratorRole = () => {
    if (!conversation.is_user) {
      return;
    }

    axios
      .post(route("user.toggleModerator", conversation.id))
      .then((res) => {
        emit("toast.show", res.data.message);
      })
      .catch((err) => {
        alert("error toast");
        console.error(err);
      });
  };

  const onBlockUser = () => {
    if (!conversation.is_user) {
      return;
    }

    axios
      .post(route("user.blockUnblock", conversation.id))
      .then((res) => {
        emit("toast.show", res.data.message);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex justify-center items-center p-2 rounded-full hover:bg-black/10">
            <EllipsisVertical className="h-4 w-4" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md bg-slate-50 shadow-lg z-50">
            <div className="px-1 py-[2px]">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onBlockUser}
                    className={`${
                      active
                        ? "bg-slate-100 text-slate-800"
                        : "text-slate-800 bg-slate-100"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {conversation.blocked_at && (
                      <>
                        <LockOpen className="w-4 h-4 mr-2" /> Unblock User
                      </>
                    )}
                    {!conversation.blocked_at && (
                      <>
                        <Lock className="w-4 h-4 mr-2" /> Block User
                      </>
                    )}
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={changeUserRole}
                    className={`${
                      active
                        ? "bg-slate-100 text-slate-800"
                        : "text-slate-800 bg-slate-100"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {conversation.is_admin && (
                      <>
                        <User className="w-4 h-4 mr-2" />
                        Make Regular User
                      </>
                    )}
                    {!conversation.is_admin && (
                      <>
                        <ShieldCheck className="w-4 h-4 mr-2" />
                        Make Admin
                      </>
                    )}
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={toggleModeratorRole}
                    className={`${
                      active
                        ? "bg-slate-100 text-slate-800"
                        : "text-slate-800 bg-slate-100"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {conversation.is_moderator && (
                      <>
                        <UserCog className="w-4 h-4 mr-2" />
                        Revoke Moderator
                      </>
                    )}
                    {!conversation.is_moderator && (
                      <>
                        <UserCog className="w-4 h-4 mr-2" />
                        Make Moderator
                      </>
                    )}
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

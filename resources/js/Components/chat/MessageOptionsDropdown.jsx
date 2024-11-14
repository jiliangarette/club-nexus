import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useEventBus } from "@/EventBus";
import { route } from "ziggy-js";
import { EllipsisVertical, Trash } from "lucide-react";

export default function MessageOptionsDropdown({ message, classes }) {
  const { emit } = useEventBus();
  const onMessageDelete = () => {
    axios
      .delete(route("message.destroy", message.id))
      .then((res) => {
        emit("message.deleted", {
          message,
          prevMessage: res.data.message,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className={`absolute right-full text-slate-800 top-1/2 -translate-y-1/2 z-10 ${classes}`}
    >
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-black/10">
            <EllipsisVertical className="h-5 w-5" />
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
          <Menu.Items className="absolute left-0 mt-2 w-48 rounded-md bg-slate-100 shadow-lg z-50">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onMessageDelete}
                    className={`${
                      active ? "bg-slate-100 text-slate-800" : "text-slate-700"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:opacity-75`}
                  >
                    <Trash className="w-6" />
                    Delete
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

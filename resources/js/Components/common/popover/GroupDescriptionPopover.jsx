import { Popover, Transition } from "@headlessui/react";
import { Info } from "lucide-react";
import { Fragment } from "react";

export default function GroupDescriptionPopover({ description, text, size }) {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`${
              open ? " text-black font-semibold" : "text-slate-900"
            } hover:text-slate-800 flex place-items-center gap-2 outline-none`}
          >
            <Info size={size} />
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
            <Popover.Panel className=" right-0 z-10 mt-3 w-[300px] max-w-sm  px-4 sm:px-0 fixed sm:absolute">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-secondary">
                <div className="bg-secondary p-4">
                  <h2 className="text-lg mb-3">Description</h2>
                  {description && <div className="text-xs">{description}</div>}
                  {!description && (
                    <div className="text-xs text-center py-4 text-slate-700">
                      No description is define.
                    </div>
                  )}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

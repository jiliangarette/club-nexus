import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Badge } from "@/Components/ui/badge";

export default function UserPicker({ value, options, onSelect }) {
  const [selected, setSelected] = useState(value);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? options
      : options.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const onSelected = (persons) => {
    setSelected(persons);
    onSelect(persons);
  };
  return (
    <>
      <Combobox value={selected} onChange={onSelected} multiple>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="border-slate-300  focus:border-slate-500  focus:ring-slate-500 rounded-sm shadow-sm mt-1 block w-full"
              displayValue={(persons) =>
                persons.length ? `${persons.length} users selected` : ""
              }
              placeholder="Select users ..."
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronsUpDown
                className="h5 w-5 text-slate-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute my-1 max-h-60 w-full overflow-auto rounded-md bg-slate-100 py-1 text-slate-800 shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-slate-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    value={person}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active
                          ? "bg-gradient-to-r from-slate-200 to-slate-300 text-slate-900"
                          : "bg-slate-100 text-slate-700"
                      }`
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-notmal"
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-900">
                            <Check className="h5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      {selected && (
        <div className="flex gap-2 mt-3 w-full  flex-wrap">
          {selected.map((person) => (
            <Badge key={person.id}>{person.name}</Badge>
          ))}
        </div>
      )}
    </>
  );
}

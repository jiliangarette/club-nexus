import { useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "../ui/badge";
import { formatMessageDateLong } from "@/helper";

const AnnouncementItem = ({ announcement }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleContentVisibility = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <div className="p-4 rounded-lg flex-col shadow-md hover:shadow-lg transition-all duration-300 ease-in-out h-fit w-full">
      <div
        className="relative flex items-center gap-x-6 overflow-hidden rounded-lg w-full px-6 py-2.5 sm:px-3.5 cursor-pointer hover:scale-[1.01] transition-all duration-300 ease-in-out"
        onClick={toggleContentVisibility}
      >
        <div
          className="absolute left-[-7rem] top-1/2 transform -translate-y-1/2 blur-2xl"
          aria-hidden="true"
        >
          <div className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-slate-800 to-slate-700 opacity-30"></div>
        </div>

        <div className="flex flex-wrap w-full justify-between gap-2">
          <p className="text-sm flex gap-2 text-slate-900">
            <strong className="font-semibold">
              {announcement.announcement_title}
            </strong>
            <span>on</span>
            <span>{formatMessageDateLong(announcement.announcement_date)}</span>
          </p>
          <Badge>{announcement.group_name}</Badge>
        </div>

        <div className="flex flex-1 justify-end">
          <button type="button" className="p-3">
            <ChevronDown
              className={`transition-all duration-400 ease-in-out ${
                isExpanded ? "" : "-rotate-90"
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`bg-white rounded-lg flex-col transition-all duration-800 ease-in-out transform ${
          isExpanded ? "flex flex-col" : "hidden"
        }`}
      >
        <div className="text-sm text-gray-700 mt-4">
          {announcement.attachments &&
            announcement.attachments.length > 0 &&
            announcement.attachments[0].url && (
              <img
                src={announcement.attachments[0].url}
                alt="Banner"
                className="w-full h-auto rounded-md"
              />
            )}

          <div className="w-4/5 text-ellipsis overflow-hidden whitespace-nowrap my-2 text-md sm:text-xl font-semibold sm:font-extrabold">
            {announcement.announcement_title}
          </div>
          <p className="sm:text-sm sm:text-md tracking-tight">
            {announcement.announcement_content}
          </p>
          <div className="text-sm text-slate-500 my-2 flex gap-2 items-end justify-end tracking-tight">
            <div>
              <div className="text-xs">posted by:</div>
            </div>
            <div className="flex text-xs gap-1">
              <div>{announcement.posted_by}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementItem;

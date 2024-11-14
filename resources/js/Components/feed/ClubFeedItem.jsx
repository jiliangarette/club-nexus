import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";

import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import GroupAvatar from "../common/avatars/GroupAvatar";

const ClubFeedItem = ({ club, style, margin, width }) => {
  const page = usePage();
  const classes =
    club.id === page.props.groupId
      ? `${margin}`
      : "bg-secondary border sm:border-none sm:bg-transparent";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={route("feed.group", club)}
          preserveState
          className={`club-item flex items-center gap-2 justify-between p-1 sm:px-2 transition-all cursor-pointer rounded-lg hover:bg-slate-200 my-1 sm:my-0 ${classes} ${width}`}
        >
          <GroupAvatar />

          <h3
            className={`text-[12px] sm:text-sm sm:font-semibold flex-1 truncate ${style}`}
          >
            {club.name}
          </h3>
        </Link>
      </TooltipTrigger>

      <TooltipContent side="right">{club.name}</TooltipContent>
    </Tooltip>
  );
};

export default ClubFeedItem;

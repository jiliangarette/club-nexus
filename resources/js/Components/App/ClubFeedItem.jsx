import { Link, usePage } from "@inertiajs/react";
import GroupAvatar from "./GroupAvatar";
import { route } from "ziggy-js";

const ClubFeedItem = ({ club, style, margin }) => {
  const page = usePage();
  const classes =
    club.id === page.props.groupId ? `${margin}` : "bg-shade sm:bg-base";

  return (
    <Link
      href={route("feed.group", club)}
      preserveState
      className={`club-item flex items-center gap-2 justify-center ml-2 p-1 px-2 sm:px-4 sm:w-fit text-gray-900 transition-all cursor-pointer rounded-xl hover:bg-blue-100 my-1  ${classes} `}
    >
      <GroupAvatar data={club.name} />
      <h3
        className={`text-[12px] sm:text-sm sm:font-semibold flex-1 truncate ${style}`}
      >
        {club.name}
      </h3>
    </Link>
  );
};

export default ClubFeedItem;

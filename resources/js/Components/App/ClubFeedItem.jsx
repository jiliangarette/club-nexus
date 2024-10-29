import { Link } from "@inertiajs/react";
import GroupAvatar from "./GroupAvatar";
import { route } from "ziggy-js";

const ClubFeedItem = ({ conversation, selectedConversation = null }) => {
  const isActive =
    selectedConversation?.is_group &&
    selectedConversation.id === conversation.id;
  const classes = isActive ? "bg-button" : "bg-shade";

  return (
    <Link
      href={route("feed.group", conversation)}
      preserveState
      className={`conversation-item flex place-items-center gap-2 justify-center ml-2 p-2 text-gray-900 transition-all cursor-pointer  rounded-xl hover:bg-blue-100 my-1 ${classes}`}
    >
      <GroupAvatar />
      <h3 className="text-sm font-semibold flex-1 text-ellipsis overflow-hidden text-nowrap">
        {conversation.name}
      </h3>
    </Link>
  );
};

export default ClubFeedItem;

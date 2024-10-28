import { Link } from "@inertiajs/react";
import GroupAvatar from "./GroupAvatar";
import { route } from "ziggy-js";

const ClubFeedItem = ({ conversation, selectedConversation = null }) => {
  const isActive =
    selectedConversation?.is_group &&
    selectedConversation.id === conversation.id;
  const classes = isActive
    ? "border-blue-500 bg-black/20"
    : "border-transparent";

  return (
    <Link
      href={route("chat.group", conversation)}
      preserveState
      className={
        "conversation-item flex items-center gap-2 p-2 text-gray-300 transition-all cursor-pointer border-l-4 hover:bg-black/30 " +
        classes
      }
    >
      <GroupAvatar />
      <h3 className="text-sm font-semibold flex-1 text-ellipsis overflow-hidden text-nowrap">
        {conversation.name}
      </h3>
    </Link>
  );
};

export default ClubFeedItem;

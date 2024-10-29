import { Link, usePage } from "@inertiajs/react";
import GroupAvatar from "./GroupAvatar";
import UserAvatar from "./UserAvatar";
import UserOptionsDropdown from "./UserOptionsDropdown";
import { route } from "ziggy-js";
import { formatMessageDateShort } from "@/helper";

const ConversationItem = ({
  conversation,
  selectedConversation = null,
  online = null,
}) => {
  const page = usePage();
  const currentUser = page.props.auth.user;
  let classes = "bg-shade";
  if (selectedConversation) {
    if (
      !selectedConversation.is_group &&
      !conversation.is_group &&
      selectedConversation.id == conversation.id
    ) {
      classes = "bg-button";
    }
    if (
      selectedConversation.is_group &&
      conversation.is_group &&
      selectedConversation.id == conversation.id
    ) {
      classes = "bg-button pt-2";
    }
  }

  return (
    <>
      <Link
        href={
          conversation.is_group
            ? route("chat.group", conversation)
            : route("chat.user", conversation)
        }
        preserveState
        className={`conversation-item flex place-items-center gap-2 justify-center ml-2 p-2 pt-1 mt-1 text-gray-900 transition-all cursor-pointer  rounded-xl ${classes}`}
      >
        {conversation.is_user && (
          <UserAvatar user={conversation} online={online} />
        )}
        {conversation.is_group && <GroupAvatar />}
        <div
          className={
            `flex-1 text-xs max-w-full overflow-hidden ` +
            (conversation.is_user && conversation.blocked_at
              ? "opacity-50"
              : "")
          }
        >
          <div className="flex gap-1 justify-between items-center">
            <h3 className="text-sm font-semibold  text-nowrap text-ellipsis ">
              {conversation.name}
            </h3>
            {conversation.last_message_date && (
              <span className="text-nowrap">
                {formatMessageDateShort(conversation.last_message_date)}
              </span>
            )}
          </div>
          {conversation.last_message && (
            <span className="text-xs text-nowrap  text-ellipsis ">
              {conversation.last_message}
            </span>
          )}
        </div>
        <div className=" -mb-1">
          {!!currentUser.is_admin && conversation.is_user && (
            <UserOptionsDropdown conversation={conversation} />
          )}
        </div>
      </Link>
    </>
  );
};
export default ConversationItem;

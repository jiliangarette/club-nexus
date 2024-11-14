import { Link, usePage } from "@inertiajs/react";
import GroupChatAvatar from "../common/avatars/GroupChatAvatar";
import UserAvatar from "../common/avatars/UserAvatar";
import UserOptionsDropdown from "../common/utilities/UserOptionsDropdown";
import { route } from "ziggy-js";
import { formatMessageDateShort } from "@/helper";

const ConversationItem = ({
  conversation,
  selectedConversation = null,
  online = null,
}) => {
  const page = usePage();
  const currentUser = page.props.auth.user;
  let classes = " bg-slate-50 hover:bg-slate-200";
  if (selectedConversation) {
    if (
      !selectedConversation.is_group &&
      !conversation.is_group &&
      selectedConversation.id == conversation.id
    ) {
      classes = "bg-gradient-to-r from-slate-200 to-slate-300";
    }
    if (
      selectedConversation.is_group &&
      conversation.is_group &&
      selectedConversation.id == conversation.id
    ) {
      classes = "bg-gradient-to-r from-slate-400 via-slate-50 to-slate-200";
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
        className={`conversation-item flex place-items-center gap-2 justify-center p-4 sm:p-2 text-slate-900 transition-all cursor-pointer  rounded-lg ${classes} ${
          conversation.blocked_at && "opacity-60"
        }`}
      >
        {conversation.is_group && (
          <div className="flex flex-col place-items-start justify-center ">
            <GroupChatAvatar />
          </div>
        )}
        {conversation.is_user && (
          <div className="scale-110 flex flex-col place-items-center justify-center pl-1">
            <UserAvatar user={conversation} online={online} />
          </div>
        )}

        <div
          className={
            `flex-1 text-xs max-w-full overflow-hidden ` +
            (conversation.is_user && conversation.blocked_at
              ? "opacity-50 "
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

import { usePage } from "@inertiajs/react";
import ReactMarkdown from "react-markdown";
import UserAvatar from "./UserAvatar";
import { formatMessageDateLong } from "@/helper";
import React from "react";
import MessageAttachments from "./MessageAttachments";
import MessageOptionsDropdown from "./MessageOptionsDropdown";
import remarkGfm from "remark-gfm";

const MessageItem = ({ message, attachmentClick }) => {
  const currentUser = usePage().props.auth.user;
  return (
    <div
      className={
        "chat" +
        (message.sender_id === currentUser.id ? " chat-end" : " chat-start")
      }
    >
      {<UserAvatar user={message.sender} />}

      <div className="chat-header">
        {message.sender_id !== currentUser.id ? message.sender.name : ""}
        <time className="text-xs opacity-50 ml-2">
          {formatMessageDateLong(message.created_at)}
        </time>
      </div>
      <div
        className={
          "chat-bubble relative " +
          (message.sender_id === currentUser.id ? "chat-bubble-info" : "")
        }
      >
        {message.sender_id == currentUser.id && (
          <MessageOptionsDropdown message={message} />
        )}
        <div className="chat-message">
          <div className="chat-message-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.message}
            </ReactMarkdown>
          </div>
          <MessageAttachments
            attachments={message.attachments}
            attachmentClick={attachmentClick}
          />
        </div>
      </div>
    </div>
  );
};
export default MessageItem;

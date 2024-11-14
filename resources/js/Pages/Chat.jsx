import { useState, useRef, useEffect, useCallback } from "react";
import { useEventBus } from "@/EventBus";
import { route } from "ziggy-js";
import axios from "axios";
import DefaultChatDisplay from "@/Components/chat/DefaultChatDisplay";
import ConversationHeader from "@/Components/chat/ConversationHeader";
import MessageItem from "@/Components/chat/MessageItem";
import MessageInput from "@/Components/chat/MessageInput";
import AuthenticatedLayout from "@/layout/AuthenticatedLayout";
import ChatLayout from "@/layout/ChatLayout";
import AttachmentPreviewModal from "@/Components/common/modals/AttachmentPreviewModal";
import { MessageCircleHeart, MessagesSquare } from "lucide-react";

function Chat({ selectedConversation = null, messages = null }) {
  const [localMessages, setLocalMessages] = useState([]);
  const [noMoreMessages, setNoMoreMessages] = useState(false);
  const [scrollFromBottom, setScrollFromBottom] = useState(0);
  const loadMoreIntersect = useRef(null);
  const messagesCtrRef = useRef(null);
  const [showAttachmentPreview, setShowAttachmentPreview] = useState(false);
  const [previewAttachment, setPreviewAttachment] = useState({});
  const { on } = useEventBus();

  const messageCreated = (message) => {
    if (
      selectedConversation &&
      selectedConversation.is_group &&
      selectedConversation.id == message.group_id
    ) {
      setLocalMessages((prevMessages) => [...prevMessages, message]);
    }
    if (
      selectedConversation &&
      selectedConversation.is_user &&
      (selectedConversation.id == message.sender_id ||
        selectedConversation.id == message.receiver_id)
    ) {
      setLocalMessages((prevMessages) => [...prevMessages, message]);
    }
  };

  const messageDeleted = ({ message }) => {
    if (
      selectedConversation &&
      selectedConversation.is_group &&
      selectedConversation.id == message.group_id
    ) {
      setLocalMessages((prevMessages) => {
        return prevMessages.filter((m) => m.id !== message.id);
      });
    }
    if (
      selectedConversation &&
      selectedConversation.is_user &&
      (selectedConversation.id == message.sender_id ||
        selectedConversation.id == message.receiver_id)
    ) {
      setLocalMessages((prevMessages) => {
        return prevMessages.filter((m) => m.id !== message.id);
      });
    }
  };
  const loadMoreMessages = useCallback(() => {
    if (noMoreMessages) {
      return;
    }

    const firstMessage = localMessages[0];
    axios.get(route("message.loadOlder", firstMessage.id)).then(({ data }) => {
      if (data.data.length === 0) {
        setNoMoreMessages(true);
        return;
      }
      const scrollHeight = messagesCtrRef.current.scrollHeight;
      const scrollTop = messagesCtrRef.current.scrollTop;
      const clientHeight = messagesCtrRef.current.clientHeight;
      const tmpScrollFromBottom = scrollHeight - scrollTop - clientHeight;
      setScrollFromBottom(scrollHeight - scrollTop - clientHeight);

      setLocalMessages((prevMessages) => {
        return [...data.data.reverse(), ...prevMessages];
      });
    });
  }, [localMessages, noMoreMessages]);

  const onAttachmentClick = (attachments, ind) => {
    setPreviewAttachment({
      attachments,
      ind,
    });
    setShowAttachmentPreview(true);
  };
  useEffect(() => {
    setTimeout(() => {
      if (messagesCtrRef.current) {
        messagesCtrRef.current.scrollTop = messagesCtrRef.current.scrollHeight;
      }
    }, 10);

    const offCreated = on("message.created", messageCreated);
    const offDeleted = on("message.deleted", messageDeleted);

    setScrollFromBottom(0);
    setNoMoreMessages(false);
    return () => {
      offCreated();
      offDeleted();
    };
  }, [selectedConversation]);

  useEffect(() => {
    setLocalMessages(messages ? messages.data.reverse() : []);
  }, [messages]);

  useEffect(() => {
    if (messagesCtrRef.current && scrollFromBottom !== null) {
      messagesCtrRef.current.scrollTop =
        messagesCtrRef.current.scrollHeight -
        messagesCtrRef.current.offsetHeight -
        scrollFromBottom;
    }

    if (noMoreMessages) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && loadMoreMessages()),
      {
        rootMargin: "0px 0px 250px 0px",
      }
    );

    if (loadMoreIntersect.current) {
      setTimeout(() => {
        observer.observe(loadMoreIntersect.current);
      }, 100);
    }

    return () => {
      observer.disconnect();
    };
  }, [localMessages, noMoreMessages]);
  return (
    <>
      <div className="  sm:pr-5 w-full h-full">
        <div className="w-full h-full bg-white shadow-md rounded-t-xl  overflow-hidden flex flex-col ">
          {!messages && (
            <div className="sm:flex flex-col gap-8 justify-center hidden items-center text-center h-full opacity-35">
              <DefaultChatDisplay />
            </div>
          )}
          {messages && (
            <>
              <ConversationHeader selectedConversation={selectedConversation} />
              <div ref={messagesCtrRef} className="flex-1 overflow-y-auto p-5">
                {localMessages.length === 0 && (
                  <div className="flex justify-center items-center h-full">
                    <div className="text-3xl text-slate-400 flex flex-col place-items-center gap-4">
                      <MessageCircleHeart size={80} strokeWidth={1} /> Start a
                      conversation
                    </div>
                  </div>
                )}
                {localMessages.length > 0 && (
                  <div className="flex-1 flex flex-col">
                    <div ref={loadMoreIntersect}></div>
                    {localMessages.map((message) => (
                      <MessageItem
                        key={message.id}
                        message={message}
                        attachmentClick={onAttachmentClick}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="">
                <MessageInput conversation={selectedConversation} />
              </div>
            </>
          )}
          {previewAttachment.attachments && (
            <AttachmentPreviewModal
              attachments={previewAttachment.attachments}
              index={previewAttachment.ind}
              show={showAttachmentPreview}
              onClose={() => setShowAttachmentPreview(false)}
            />
          )}
        </div>
      </div>
    </>
  );
}

Chat.layout = (page) => {
  return (
    <AuthenticatedLayout user={page.props.auth.user} classes="max-h-screen">
      <ChatLayout children={page} />
    </AuthenticatedLayout>
  );
};

export default Chat;

import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
  ChatBubbleOvalLeftIcon,
  HomeModernIcon,
  MegaphoneIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import TextInput from "@/Components/TextInput";
import ConversationItem from "@/Components/App/ConversationItem";
import { useEventBus } from "@/EventBus";
import GroupModal from "@/Components/App/GroupModal";
import { route } from "ziggy-js";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

const ChatLayout = ({ children }) => {
  const page = usePage();
  const conversations = page.props.conversations;
  const selectedConversation = page.props.selectedConversation;
  const [onlineUsers, setOnlineUsers] = useState({});
  const [localConversations, setLocalConversations] = useState([]);
  const [sortedConversations, setSortedConversations] = useState([]);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [wideSidebar, setWideSidebar] = useState(true);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const user = page.props.auth.user;

  const isUserOnline = (userId) => onlineUsers[userId];
  const { on, emit } = useEventBus();

  const onSearch = (ev) => {
    const search = ev.target.value.toLowerCase();
    setLocalConversations(
      conversations.filter((conversation) => {
        return conversation.name.toLowerCase().includes(search);
      })
    );
  };
  const messageCreated = (message) => {
    setLocalConversations((oldUsers) => {
      return oldUsers.map((u) => {
        if (
          message.receiver_id &&
          !u.is_group &&
          (u.id === message.sender_id || u.id == message.receiver_id)
        ) {
          u.last_message = message.message;
          u.last_message_date = message.created_at;
          return u;
        }

        if (message.group_id && !u.is_group && u.id == message.group_id) {
          u.last_message = message.message;
          u.last_message_date = message.created_at;
          return u;
        }
        return u;
      });
    });
  };

  const messageDeleted = ({ prevMessage }) => {
    if (!prevMessage) {
      return;
    }

    messageCreated(prevMessage);
  };

  useEffect(() => {
    const offCreated = on("message.created", messageCreated);
    const offDeleted = on("message.deleted", messageDeleted);
    const offModalShow = on("GroupModal.show", (group) => {
      setShowGroupModal(true);
    });
    console.log(page.props);
    const offGroupDelete = on("group.deleted", ({ id, name }) => {
      setLocalConversations((oldConversations) => {
        return oldConversations.filter((con) => con.id != id);
      });
      emit("toast.show", `Group "${name}" was deleted`);

      if (
        !selectedConversation ||
        (selectedConversation.is_group && selectedConversation.id == id)
      ) {
        router.visit(route("feed"));
      }
    });
    return () => {
      offCreated();
      offDeleted();
      offModalShow();
      offGroupDelete();
    };
  }, [on]);

  useEffect(() => {
    setSortedConversations(
      localConversations.sort((a, b) => {
        if (a.blocked_at && b.blocked_at) {
          return a.blocked_at > b.blocked_at ? 1 : -1;
        } else if (a.blocked_at) {
          return 1;
        } else if (b.blocked_at) {
          return -1;
        }

        if (a.last_message_date && b.last_message_date) {
          return b.last_message_date.localeCompare(a.last_message_date);
        } else if (a.last_message_date) {
          return -1;
        } else if (b.last_message_date) {
          return 1;
        } else {
          return 0;
        }
      })
    );
  }, [localConversations]);

  useEffect(() => {
    setLocalConversations(conversations);
  }, [conversations]);

  useEffect(() => {
    Echo.join("online")
      .here((users) => {
        const onlineUserObj = Object.fromEntries(
          users.map((user) => [user.id, user])
        );
        0;

        setOnlineUsers((prevOnlineUsers) => {
          return { ...prevOnlineUsers, ...onlineUserObj };
        });
      })
      .joining((user) => {
        setOnlineUsers((prevOnlineUsers) => {
          const updatedUsers = { ...prevOnlineUsers };
          updatedUsers[user.id] = user;
          return updatedUsers;
        });
      })
      .leaving((user) => {
        setOnlineUsers((prevOnlineUsers) => {
          const updatedUsers = { ...prevOnlineUsers };
          delete updatedUsers[user.id];
          return updatedUsers;
        });
      })
      .error((error) => {
        console.error("error", error);
      });

    return () => {
      Echo.leave("online");
    };
  }, []);
  const handleSidebisarWidth = () => {
    setWideSidebar(!wideSidebar);
  };
  return (
    <>
      <div className="flex-1 w-full flex overflow-hidden ">
        <div
          className={`transition-all w-full sm:w-[220px] md:w-[300px]  flex flex-col
                    ${selectedConversation ? "-ml-[100%] sm:ml-0" : ""}`}
        >
          <div className="hover:bg-gray-100 rounded-lg hideen sm:block sm:flex-col flex px-2 sm:my-6">
            <div className=" w-full hidden sm:block text-sm font-semibold text-gray-500 pl-8 mt-3 h-8 p-2 ">
              {wideSidebar ? "Shortcuts" : ""}
            </div>

            <div
              className="tooltip sm:tooltip-right py-[1px] sm:px-2 pl-[6px] flex w-full"
              data-tip="Community Feed"
            >
              <Link href={route("feed")} className="w-full">
                <SecondaryButton
                  onClick={() => setShowNewUserModal(true)}
                  className={`border-none  w-full justify-center sm:justify-start flex`}
                >
                  <HomeModernIcon className="w-4 h-4" />
                  {wideSidebar ? (
                    <span className="ml-2 text-nowrap sm:block hidden ">
                      Feed
                    </span>
                  ) : (
                    ""
                  )}
                </SecondaryButton>
              </Link>
            </div>
            <div
              className="tooltip sm:tooltip-right py-[2px] sm:px-2 pl-[6px] flex w-full "
              data-tip="Club Chat"
            >
              <Link href={route("chat")} className="w-full">
                <PrimaryButton
                  className={`border-none  w-full justify-center sm:justify-start flex`}
                >
                  <ChatBubbleOvalLeftIcon className="w-4 h-4" />
                  {wideSidebar ? (
                    <span className="ml-2 text-nowrap sm:block hidden ">
                      Chat
                    </span>
                  ) : (
                    ""
                  )}
                </PrimaryButton>
              </Link>
            </div>
            <div
              className="tooltip sm:tooltip-right py-[2px] sm:px-2 pl-[6px] flex w-full "
              data-tip="Announcement"
            >
              <SecondaryButton
                onClick={() => setShowNewUserModal(true)}
                className={`border-none  w-full justify-center sm:justify-start flex`}
              >
                <MegaphoneIcon className="w-4 h-4" />
                {wideSidebar ? (
                  <span className="ml-2 text-nowrap sm:block hidden ">
                    Announcement
                  </span>
                ) : (
                  ""
                )}
              </SecondaryButton>
            </div>
            {user.is_admin && (
              <>
                <div
                  className="tooltip sm:tooltip-right sm:px-2 pl-[6px] py-[2px] flex w-full"
                  data-tip="Create new use"
                >
                  <SecondaryButton
                    onClick={() => setShowNewUserModal(true)}
                    className={`border-none  w-full justify-center sm:justify-start flex`}
                  >
                    <UserPlusIcon className="w-4 h-4" />
                    {wideSidebar ? (
                      <span className="ml-2 text-nowrap sm:block hidden ">
                        Add New User
                      </span>
                    ) : (
                      ""
                    )}
                  </SecondaryButton>
                </div>

                <div
                  className="tooltip sm:tooltip-right sm:px-2 pl-[6px] py-[2px] flex w-full"
                  data-tip="Create new use"
                >
                  <SecondaryButton
                    onClick={() => setShowGroupModal(true)}
                    className={`border-none  w-full justify-center sm:justify-start flex`}
                  >
                    <PlusCircleIcon className="w-4 h-4" />
                    {wideSidebar ? (
                      <span className="ml-2 text-nowrap sm:block hidden ">
                        Create bew group
                      </span>
                    ) : (
                      ""
                    )}
                  </SecondaryButton>
                </div>
              </>
            )}
          </div>
          <div className="p-3">
            <TextInput
              onKeyUp={onSearch}
              placeholder="Filter users and groups"
              className="w-full p-2 pl-4"
            />
          </div>

          <div className="flex-1 overflow-auto">
            {sortedConversations &&
              sortedConversations.map((conversation) => (
                <ConversationItem
                  key={`${conversation.is_group ? "group_" : "user_"}${
                    conversation.id
                  }`}
                  conversation={conversation}
                  online={!!isUserOnline(conversation.id)}
                  selectedConversation={selectedConversation}
                />
              ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col ">{children}</div>
      </div>

      <GroupModal
        show={showGroupModal}
        onClose={() => setShowGroupModal(false)}
      />
    </>
  );
};

export default ChatLayout;

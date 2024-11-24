import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

import ConversationItem from "@/Components/chat/ConversationItem";
import { useEventBus } from "@/EventBus";
import GroupModal from "@/Components/common/modals/GroupModal";
import { route } from "ziggy-js";
import NavigationButton from "@/Components/common/buttons/NavigationButton";
import {
  House,
  Megaphone,
  MessageCircle,
  Search,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";
import { Input } from "@/Components/ui/input";
import NewUserModal from "@/Components/common/modals/NewUserModal";

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
  const [isFocus, setIsFocus] = useState(false);

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

  const handleFocus = () => {
    setIsFocus(true);
  };

  //hide the users
  const handleBlur = () => {
    setTimeout(() => {
      setIsFocus(false);
    }, 5000);
  };

  return (
    <>
      <div className="flex-1 w-full flex overflow-hidden ">
        <div
          className={`transition-all w-full sm:w-[220px] md:w-[300px]  flex-col
                    ${selectedConversation ? "-ml-[100%] sm:ml-0" : ""}`}
        >
          <div className=" rounded-lg  sm:block sm:flex-col flex  sm:my-6  pb-2 ">
            <div className=" w-full hidden sm:block text-sm font-semibold text-slate-500 pl-8 mt-3 h-8 p-2 ">
              {wideSidebar ? "Shortcuts" : ""}
            </div>
            <div className="flex sm:flex-col gap-2 justify-between sm:border-none border-b-[1px] w-full sm:my-2 ">
              <div className="  sm:px-2 pl-[6px] flex w-full">
                <Link
                  href={route("feed")}
                  className="w-full sm:flex sm:justify-start"
                >
                  <NavigationButton
                    className={`border-none  w-full sm:w-fit justify-center sm:justify-start flex`}
                  >
                    <House size={24} className="text-slate-500" />
                    {wideSidebar ? (
                      <span className="ml-2 text-nowrap sm:block hidden ">
                        Club Feed
                      </span>
                    ) : (
                      ""
                    )}
                  </NavigationButton>
                </Link>
              </div>

              <div className=" sm:py-[2px] sm:px-2 pl-[6px] flex w-full ">
                <Link
                  href={route("announcement")}
                  className="w-full sm:flex sm:justify-start"
                >
                  <NavigationButton
                    className={`border-none  w-full sm:w-fit justify-center sm:justify-start flex`}
                  >
                    <Megaphone size={24} className="text-slate-500" />
                    {wideSidebar ? (
                      <span className="ml-2 text-nowrap sm:block hidden ">
                        Announcement
                      </span>
                    ) : (
                      ""
                    )}
                  </NavigationButton>
                </Link>
              </div>
              <div className=" sm:py-[2px] sm:px-2 pl-[6px] flex w-full ">
                <Link
                  href={route("chat")}
                  className="w-full sm:flex sm:justify-start"
                >
                  <NavigationButton
                    className={`border-none w-full sm:w-fit justify-center sm:justify-start flex`}
                    active={true}
                  >
                    <MessageCircle size={24} fill="black" />
                    {wideSidebar ? (
                      <span className="ml-2 text-nowrap sm:block hidden ">
                        Club Chat
                      </span>
                    ) : (
                      ""
                    )}
                  </NavigationButton>
                </Link>
              </div>
              {user.is_admin ||
                (user.is_moderator && (
                  <>
                    <div className=" sm:px-2 pl-[6px] sm:py-[2px] flex w-full">
                      <NavigationButton
                        onClick={() => setShowNewUserModal(true)}
                        className={`border-none  w-full sm:w-fit justify-center sm:justify-start flex`}
                      >
                        <UserRoundPlus size={24} className="text-slate-500" />
                        {wideSidebar ? (
                          <span className="ml-2 text-nowrap sm:block hidden ">
                            Create User
                          </span>
                        ) : (
                          ""
                        )}
                      </NavigationButton>
                    </div>

                    <div className=" sm:px-2 pl-[6px] sm:py-[2px] flex w-full">
                      <NavigationButton
                        onClick={() => setShowGroupModal(true)}
                        className={`border-none  w-fit justify-center sm:justify-start flex`}
                      >
                        <UsersRound size={24} className="text-slate-500" />
                        {wideSidebar ? (
                          <span className="ml-2 text-nowrap sm:w-fit sm:block hidden ">
                            Create Club
                          </span>
                        ) : (
                          ""
                        )}
                      </NavigationButton>
                    </div>
                  </>
                ))}
            </div>
          </div>
          <div className="w-full hidden sm:block text-sm font-thin text-slate-400 pl-8 mt-3 h-8 p-2 pb-1 ">
            {wideSidebar ? "Clubs and Members" : ""}
          </div>
          <div className="px-2 mb-1">
            <div className="w-full mx-auto ">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 " />
                <Input
                  type="search"
                  onKeyUp={onSearch}
                  onFocus={handleFocus}
                  // onBlur={handleBlur}
                  id="search"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-full rounded-md border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 hover:overflow-auto sm:h-80 px-2 h-full mr-[18px] hover:mr-0">
            {sortedConversations &&
              sortedConversations.map((conversation) => (
                <span
                  key={`${conversation.is_group ? "group_" : "user_"}${
                    conversation.id
                  }`}
                >
                  {(isFocus ||
                    conversation.last_message ||
                    conversation.is_group) && (
                    <ConversationItem
                      conversation={conversation}
                      online={!!isUserOnline(conversation.id)}
                      selectedConversation={selectedConversation}
                    />
                  )}
                </span>
              ))}
          </div>
        </div>
        <NewUserModal
          show={showNewUserModal}
          onClose={() => setShowNewUserModal(false)}
        />
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

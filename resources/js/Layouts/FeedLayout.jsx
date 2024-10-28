import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
  ChatBubbleOvalLeftIcon,
  HomeModernIcon,
  MagnifyingGlassIcon,
  MegaphoneIcon,
  PlusCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import TextInput from "@/Components/TextInput";
import { useEventBus } from "@/EventBus";
import GroupModal from "@/Components/App/GroupModal";
import { route } from "ziggy-js";
import ClubFeedItem from "@/Components/App/ClubFeedItem";
import PrimaryButton from "@/Components/PrimaryButton";
import NewUserModal from "@/Components/App/NewUserModal";
import SecondaryButton from "@/Components/SecondaryButton";
import NavLink from "@/Components/NavLink";

const FeedLayout = ({ children }) => {
  const page = usePage();
  const conversations = page.props.conversations;
  const selectedConversation = page.props.selectedConversation;
  const [localConversations, setLocalConversations] = useState([]);
  const [sortedConversations, setSortedConversations] = useState([]);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [wideSidebar, setWideSidebar] = useState(true);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const { on, emit } = useEventBus();
  const user = page.props.auth.user;

  const onSearch = (ev) => {
    const search = ev.target.value.toLowerCase();
    setLocalConversations(
      conversations.filter(
        (conversation) =>
          conversation.is_group && // Only groups
          conversation.name.toLowerCase().includes(search)
      )
    );
  };

  const messageCreated = (message) => {
    setLocalConversations((oldUsers) => {
      return oldUsers.map((u) => {
        if (
          message.group_id &&
          u.is_group && // Only groups
          u.id == message.group_id
        ) {
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
    const offModalShow = on("GroupModal.show", () => {
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
        router.visit(route("dashboard"));
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
      localConversations
        .filter((conversation) => conversation.is_group) // Filter only groups
        .sort((a, b) => {
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

  const handleSidebisarWidth = () => {
    setWideSidebar(!wideSidebar);
  };

  return (
    <>
      <div className="flex-1 w-full flex sm:overflow-hidden relative flex-col sm:flex-row">
        <div
          className="fixed top-4 transition-all duration-300 ease-in-out hover:opacity-90 left-5 cursor-pointer hover:bg-shade p-2 rounded-md hidden sm:block"
          onClick={handleSidebisarWidth}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <div
          className={`transition-all w-full sm:w-[50px]  md:${
            wideSidebar && "w-[300px]"
          } flex flex-col 
                    ${selectedConversation ? "-ml-[100%] sm:ml-0" : ""}`}
        >
          <div className="flex items-center justify-between py-2 px-3 text-xl font-medium ">
            <span className="flex-nowrap overflow-hidden text-nowrap">
              Club News Feed
            </span>
            <div
              className={`z-50 relative tooltip ${
                wideSidebar ? "tooltip-right" : "tooltip-right"
              }`}
              data-tip="Create new Group"
            >
              <button
                onClick={() => setShowGroupModal(true)}
                className="hover:bg-shade transition-all duration-300 ease-in-out p-2 rounded-lg"
              >
                <PlusCircleIcon className="w-5 h-5 text-gray-900 text-center" />
              </button>
            </div>
          </div>
          <div
            className="p-2 pl-2 relative"
            onClick={() => setWideSidebar(true)}
          >
            <MagnifyingGlassIcon className="absolute top-6 cursor-pointer left-[18px] w-5 h-5" />
            <TextInput
              onKeyUp={onSearch}
              placeholder="Filter groups"
              className={`w-full p-2 pl-10 ${
                !wideSidebar && "opacity-0 cursor-pointer"
              }`}
            />
          </div>
          <div className="flex-1 overflow-auto">
            {sortedConversations.map((conversation) => (
              <ClubFeedItem
                key={`group_${conversation.id}`}
                conversation={conversation}
                selectedConversation={selectedConversation}
              />
            ))}
          </div>
          <div className="hover:bg-gray-100 p-2 rounded-lg">
            <div
              className="tooltip tooltip-right py-1 px-2 flex  "
              data-tip="Newsfeed"
            >
              <PrimaryButton
                onClick={() => setShowNewUserModal(true)}
                className={`border-none ${wideSidebar && "w-full"}`}
              >
                <HomeModernIcon className="w-5 h-5" />
                {wideSidebar ? (
                  <span className="ml-2 text-nowrap">Club Feed</span>
                ) : (
                  ""
                )}
              </PrimaryButton>
            </div>
            <div
              className="tooltip tooltip-right py-1 px-2 flex  "
              data-tip="Club Chat"
            >
              <NavLink href={route("chat")} className="w-full">
                <SecondaryButton
                  className={`border-none ${wideSidebar && "w-full"}`}
                >
                  <ChatBubbleOvalLeftIcon className="w-5 h-5" />
                  {wideSidebar ? (
                    <span className="ml-2 text-nowrap">Club Chat</span>
                  ) : (
                    ""
                  )}
                </SecondaryButton>
              </NavLink>
            </div>
            <div
              className="tooltip tooltip-right py-1 px-2 flex  "
              data-tip="Announcement"
            >
              <SecondaryButton
                onClick={() => setShowNewUserModal(true)}
                className={`border-none ${wideSidebar && "w-full"}`}
              >
                <MegaphoneIcon className="w-5 h-5" />
                {wideSidebar ? (
                  <span className="ml-2 text-nowrap">Announcement</span>
                ) : (
                  ""
                )}
              </SecondaryButton>
            </div>
            <div
              className="tooltip tooltip-right px-2 py-1 flex "
              data-tip="create new user"
            >
              {user.is_admin && (
                <SecondaryButton
                  onClick={() => setShowNewUserModal(true)}
                  className={`border-none ${wideSidebar && "w-full"}`}
                >
                  <UserPlusIcon className="w-5 h-5" />
                  {wideSidebar ? (
                    <span className="ml-2 text-nowrap">Add New User</span>
                  ) : (
                    ""
                  )}
                </SecondaryButton>
              )}
            </div>
          </div>
        </div>
        <NewUserModal
          show={showNewUserModal}
          onClose={() => setShowNewUserModal(false)}
        />
        <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
      </div>

      <GroupModal
        show={showGroupModal}
        onClose={() => setShowGroupModal(false)}
      />
    </>
  );
};

export default FeedLayout;

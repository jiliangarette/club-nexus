import { Link, router, usePage } from "@inertiajs/react";
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
          conversation.is_group &&
          conversation.name.toLowerCase().includes(search)
      )
    );
  };

  const messageCreated = (message) => {
    setLocalConversations((oldUsers) => {
      return oldUsers.map((u) => {
        if (message.group_id && u.is_group && u.id == message.group_id) {
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
          className="fixed top-4 transition-all duration-300 ease-in-out hover:opacity-90 left-4 cursor-pointer hover:bg-shade p-2 rounded-md hidden sm:block"
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
        <div className="flex flex-col">
          <div className="hover:bg-gray-100 rounded-lg hideen sm:block sm:flex-col flex px-2 sm:my-6">
            <div className=" w-full hidden sm:block text-sm font-semibold text-gray-500 pl-8 mt-3 h-8 p-2 ">
              {wideSidebar ? "Shortcuts" : ""}
            </div>

            <div
              className="tooltip sm:tooltip-right py-[1px] sm:px-2 pl-[6px] flex w-full"
              data-tip="Community Feed"
            >
              <PrimaryButton
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
              </PrimaryButton>
            </div>
            <div
              className="tooltip sm:tooltip-right py-[2px] sm:px-2 pl-[6px] flex w-full "
              data-tip="Club Chat"
            >
              <Link href={route("chat")} className="w-full">
                <SecondaryButton
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
                </SecondaryButton>
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
          <div
            className={`transition-all w-full sm:w-[50px]  md:${
              wideSidebar && "w-[300px]"
            } flex flex-col
                    `}
          >
            <div className="sm:flex-1 flex sm:flex-col overflow-x-scroll sm:my-4">
              <div className="w-full hidden sm:block text-sm font-semibold text-gray-500 pl-8 mt-3 h-8 p-2 pb-1 ">
                {wideSidebar ? "Clubs" : ""}
              </div>

              {sortedConversations.map((conversation) => (
                <ClubFeedItem
                  key={`group_${conversation.id}`}
                  conversation={conversation}
                  selectedConversation={selectedConversation}
                />
              ))}
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

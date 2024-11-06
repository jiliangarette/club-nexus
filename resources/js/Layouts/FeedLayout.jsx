import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
  ChatBubbleOvalLeftIcon,
  HomeModernIcon,
  MegaphoneIcon,
  PlusCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import GroupModal from "@/Components/App/GroupModal";
import { route } from "ziggy-js";
import ClubFeedItem from "@/Components/App/ClubFeedItem";
import PrimaryButton from "@/Components/PrimaryButton";
import NewUserModal from "@/Components/App/NewUserModal";
import NavigationButton from "@/Components/App/NavigationButton";

const FeedLayout = ({ children }) => {
  const page = usePage();
  const conversations = page.props.conversations || [];
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [wideSidebar, setWideSidebar] = useState(true);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const user = page.props.auth.user;

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
          <div className=" rounded-lg hideen sm:block sm:flex-col flex px-2 sm:my-6 sm:fixed left-0 top-20 sm:place-items-start">
            <div className=" w-full hidden sm:block text-sm font-semibold text-gray-500 pl-8 mt-3 h-8 p-2 ">
              {wideSidebar ? "Shortcuts" : ""}
            </div>

            <div
              className="tooltip sm:tooltip-right py-[1px] sm:px-2 pl-[6px] flex w-full"
              data-tip="Community Feed"
            >
              <PrimaryButton
                onClick={() => setShowNewUserModal(true)}
                className={`border-none  w-full sm:w-fit justify-center sm:justify-start flex`}
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
              <Link
                href={route("chat")}
                className="w-full sm:flex sm:justify-start"
              >
                <NavigationButton
                  className={`border-none w-full sm:w-fit justify-center sm:justify-start flex`}
                >
                  <ChatBubbleOvalLeftIcon className="w-4 h-4" />
                  {wideSidebar ? (
                    <span className="ml-2 text-nowrap sm:block hidden ">
                      Chat
                    </span>
                  ) : (
                    ""
                  )}
                </NavigationButton>
              </Link>
            </div>
            <div
              className="tooltip sm:tooltip-right py-[2px] sm:px-2 pl-[6px] flex w-full "
              data-tip="Announcement"
            >
              <NavigationButton
                onClick={() => setShowNewUserModal(true)}
                className={`border-none  w-full sm:w-fit justify-center sm:justify-start flex`}
              >
                <MegaphoneIcon className="w-4 h-4" />
                {wideSidebar ? (
                  <span className="ml-2 text-nowrap sm:block hidden ">
                    Announcement
                  </span>
                ) : (
                  ""
                )}
              </NavigationButton>
            </div>
            {user.is_admin && (
              <>
                <div
                  className="tooltip sm:tooltip-right sm:px-2 pl-[6px] py-[2px] flex w-full"
                  data-tip="Create new user"
                >
                  <NavigationButton
                    onClick={() => setShowNewUserModal(true)}
                    className={`border-none  w-full sm:w-fit justify-center sm:justify-start flex`}
                  >
                    <UserPlusIcon className="w-4 h-4" />
                    {wideSidebar ? (
                      <span className="ml-2 text-nowrap sm:block hidden ">
                        Add new user
                      </span>
                    ) : (
                      ""
                    )}
                  </NavigationButton>
                </div>

                <div
                  className="tooltip sm:tooltip-right sm:px-2 pl-[6px] py-[2px] flex w-full"
                  data-tip="Create new user"
                >
                  <NavigationButton
                    onClick={() => setShowGroupModal(true)}
                    className={`border-none  w-full justify-center sm:justify-start flex`}
                  >
                    <PlusCircleIcon className="w-4 h-4" />
                    {wideSidebar ? (
                      <span className="ml-2 text-nowrap sm:w-fit sm:block hidden ">
                        Create new group
                      </span>
                    ) : (
                      ""
                    )}
                  </NavigationButton>
                </div>
              </>
            )}
          </div>
          <div
            className={`transition-all w-full sm:w-[80px]  md:${
              wideSidebar && "w-[300px]"
            } flex flex-col
                    `}
          >
            <div className="sm:flex-1 flex sm:flex-col sm:my-4 sm:fixed top-[500px] left-0">
              <div className="w-full hidden sm:block text-sm font-semibold text-gray-500 pl-8 mt-3 h-8 p-2 pb-1 ">
                {wideSidebar ? "Clubs" : ""}
              </div>
              <div className=" px-2 flex sm:flex-col overflow-x-scroll sm:overflow-hidden w-full">
                {conversations
                  .filter((conversation) => conversation.is_group)
                  .map((conversation) => (
                    <ClubFeedItem
                      style={!wideSidebar && "absolute hidden"}
                      key={`group_${conversation.id}`}
                      club={conversation}
                      margin={!wideSidebar ? "bg-none" : "bg-button"}
                    />
                  ))}
              </div>
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

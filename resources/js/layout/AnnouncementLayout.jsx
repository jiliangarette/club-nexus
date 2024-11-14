import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

import GroupModal from "@/Components/common/modals/GroupModal";
import { route } from "ziggy-js";
import ClubFeedItem from "@/Components/feed/ClubFeedItem";
import NewUserModal from "@/Components/common/modals/NewUserModal";
import NavigationButton from "@/Components/common/buttons/NavigationButton";
import {
  House,
  Megaphone,
  MessageCircle,
  Plus,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";

const AnnouncementLayout = ({ children }) => {
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
          className="fixed top-4 transition-all duration-300 ease-in-out left-4  hidden sm:block"
          onClick={handleSidebisarWidth}
        >
          <NavigationButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-panel-left"
            >
              <rect width="18" height="18" x="2" y="3" rx="4" />
              <path d={`M${wideSidebar ? "12" : "7"} 3v18`} />
            </svg>
          </NavigationButton>
        </div>
        <div
          className={`transition-all w-full sm:w-[80px]  md:${
            wideSidebar && "w-[300px]"
          } flex flex-col
                    `}
        >
          <div className="flex flex-col ">
            <div className=" rounded-lg hideen sm:block sm:flex-col flex sm:px-2  sm:my-6 sm:fixed left-0 top-20 sm:place-items-start sm:w-[250px] ">
              <div className=" w-full hidden sm:block text-sm font-thin text-slate-400 pl-8 mt-3 h-8 p-2 ">
                {wideSidebar ? "Shortcuts" : ""}
              </div>
              <div className="flex sm:flex-col gap-2 w-full sm:border-none border-b-[1px]">
                <div className="ht  m-0 sm:px-2 pl-[6px] flex w-full">
                  <Link
                    href={route("feed")}
                    className="w-full sm:flex sm:justify-start"
                  >
                    <NavigationButton
                      className={`border-none  w-full sm:w-fit justify-center sm:justify-start flex`}
                    >
                      <House size={24} />
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

                <div className=" py-[2px] sm:px-2 pl-[6px] flex w-full ">
                  <NavigationButton
                    className={`border-none  w-full sm:w-fit justify-center sm:justify-start flex`}
                    active={true}
                  >
                    <Megaphone size={24} fill="black" />
                    {wideSidebar ? (
                      <span className="ml-2 text-nowrap sm:block hidden ">
                        Announcement
                      </span>
                    ) : (
                      ""
                    )}
                  </NavigationButton>
                </div>
                <div className=" py-[2px] sm:px-2 pl-[6px] flex w-full ">
                  <Link
                    href={route("chat")}
                    className="w-full sm:flex sm:justify-start"
                  >
                    <NavigationButton
                      className={`border-none w-full sm:w-fit justify-center sm:justify-start flex`}
                    >
                      <MessageCircle size={24} className="text-slate-500" />
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
              </div>
            </div>
            <div
              className={`sm:flex-1 flex sm:flex-col sm:my-4 sm:fixed top-[400px] left-0  ${
                wideSidebar && "sm:w-[250px]"
              } `}
            >
              <div className="w-full hidden sm:block text-sm font-thin text-slate-400 pl-8 mt-3 h-8 p-2 pb-1 ">
                {wideSidebar ? "Clubs" : ""}
              </div>

              <div className=" px-2 flex sm:flex-col gap-1 my-1 sm:my-0 sm:overflow-hidden hover:sm:overflow-y-scroll sm:overflow-x-hidden hover:overflow-x-scroll w-full sm:ml-2 sm:h-64">
                {conversations
                  .filter((conversation) => conversation.is_group)
                  .map((conversation) => (
                    <ClubFeedItem
                      style={!wideSidebar && "absolute hidden "}
                      key={`group_${conversation.id}`}
                      club={conversation}
                      margin={
                        !wideSidebar
                          ? "bg-none "
                          : "bg-gradient-to-r from-slate-200 to-slate-300 "
                      }
                      width={!wideSidebar ? "sm:w-fit " : "sm:w-full"}
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

export default AnnouncementLayout;

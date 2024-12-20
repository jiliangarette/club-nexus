import { useState } from "react";
import ApplicationLogo from "@/Components/common/utilities/ApplicationLogo";
import ResponsiveNavLink from "@/Components/common/navigation/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { useEffect } from "react";
import { useEventBus } from "@/EventBus";
import Toast from "@/Components/common/utilities/Toast";
import NewMessageNotification from "@/Components/chat/NewMessageNotification";
import NewUserModal from "@/Components/common/modals/NewUserModal";
import UserAvatar from "@/Components/common/avatars/UserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

export default function AuthenticatedLayout({ header, children, classes }) {
  const page = usePage();

  const user = page.props.auth.user;
  const conversations = page.props.conversations;
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const { emit } = useEventBus();

  useEffect(() => {
    conversations.forEach((conversation) => {
      let channel = `message.group.${conversation.id}`;

      if (conversation.is_user) {
        channel = `message.user.${[parseInt(user.id), parseInt(conversation.id)]
          .sort((a, b) => a - b)
          .join("-")}`;
      }

      Echo.private(channel)
        .error((error) => {
          console.error(error);
        })
        .listen("SocketMessage", (e) => {
          const message = e.message;

          emit("message.created", message);
          if (message.sender_id === user.id) {
            return;
          }
          emit("newMessageNotification", {
            user: message.sender,
            group_id: message.group_id,
            message:
              message.message ||
              `Shared ${
                message.attachments.length === 1
                  ? "an attachment"
                  : message.attachments.length + "attachments"
              }`,
          });
        });

      if (conversation.is_group) {
        Echo.private(`group.deleted.${conversation.id}`)
          .listen("GroupDeleted", (e) => {
            emit("group.deleted", { id: e.id, name: e.name });
          })
          .error((e) => {
            console.error(e);
          });
      }
    });

    return () => {
      conversations.forEach((conversation) => {
        let channel = `message.group.${conversation.id}`;

        if (conversation.is_user) {
          channel = `message.user.${[
            parseInt(user.id),
            parseInt(conversation.id),
          ]
            .sort((a, b) => a - b)
            .join("-")}`;
        }
        Echo.leave(channel);

        if (conversation.is_group) {
          Echo.leave(`group.deleted.${conversation.id}`);
        }
      });
    };
  }, [conversations]);
  return (
    <>
      <div
        className={`min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col ${classes}`}
      >
        <nav className=" bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-10">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="shrink-0 flex items-center">
                  <Link href="/" className="flex items-center sm:ml-8">
                    <ApplicationLogo className="block h-9 w-auto fill-current text-slate-800 dark:text-slate-200" />
                    <div className="pt-2 font-extrabold  -mx-1"> EXUS</div>
                  </Link>
                </div>
              </div>

              <div className="hidden sm:flex sm:items-center sm:ms-6">
                <div className="ms-3  flex">
                  {/* <Dropdown>
                    <Dropdown.Trigger>
                      <span className="inline-flex rounded-md cursor-pointer">
                        <UserAvatar user={user} />
                      </span>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                      <div className="border-b-2 text-sm font-semibold p-1 px-3">
                        Account
                      </div>
                      <Dropdown.Link href={route("profile.edit")}>
                        Profile
                      </Dropdown.Link>
                      <Dropdown.Link
                        href={route("logout")}
                        method="post"
                        as="button"
                      >
                        Log Out
                      </Dropdown.Link>
                    </Dropdown.Content>
                  </Dropdown> */}
                  <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                      <span className="inline-flex rounded-md cursor-pointer">
                        <UserAvatar user={user} />
                      </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-8">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <Link href={route("profile.edit")}>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                      </Link>
                      <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="w-full"
                      >
                        <DropdownMenuItem>Log Out</DropdownMenuItem>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="-me-2 flex items-center sm:hidden">
                <button
                  onClick={() =>
                    setShowingNavigationDropdown(
                      (previousState) => !previousState
                    )
                  }
                  className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 dark:text-slate-500 hover:text-slate-500 dark:hover:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-900 focus:text-slate-500 dark:focus:text-slate-400 transition duration-150 ease-in-out"
                >
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className={
                        !showingNavigationDropdown ? "inline-flex" : "hidden"
                      }
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                    <path
                      className={
                        showingNavigationDropdown ? "inline-flex" : "hidden"
                      }
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div
            className={
              (showingNavigationDropdown ? "block" : "hidden") + " sm:hidden"
            }
          >
            <div className="pt-2 pb-3 space-y-1 hidden">
              <ResponsiveNavLink
                href={route("feed")}
                active={route().current("feed")}
              >
                Community Feed
              </ResponsiveNavLink>
            </div>

            <div className="pt-4 pb-1 border-t border-slate-200 ">
              <div className="px-4">
                <div className="font-medium text-slate-500 ">{user.name}</div>
                <div className="font-medium text-sm text-slate-500">
                  {user.email}
                </div>
              </div>

              <div className="mt-3 space-y-1">
                <ResponsiveNavLink href={route("profile.edit")}>
                  Profile
                </ResponsiveNavLink>
                <ResponsiveNavLink
                  method="post"
                  href={route("logout")}
                  as="button"
                >
                  Log Out
                </ResponsiveNavLink>
              </div>
            </div>
          </div>
        </nav>
        {header && (
          <header className="bg-white dark:bg-slate-800 shadow ">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              {header}
            </div>
          </header>
        )}
        {children}
        <NewUserModal
          show={showNewUserModal}
          onClose={() => setShowNewUserModal(false)}
        />
      </div>
      <Toast />
      <NewMessageNotification />
    </>
  );
}

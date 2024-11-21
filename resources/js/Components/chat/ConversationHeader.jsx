import { Link, usePage } from "@inertiajs/react";
import UserAvatar from "../common/avatars/UserAvatar";
import GroupDescriptionPopover from "../common/popover/GroupDescriptionPopover";
import GroupUsersPopover from "../common/popover/GroupUsersPopover";
import { useEventBus } from "@/EventBus";
import { route } from "ziggy-js";
import { ArrowLeft, EllipsisVertical, SquarePen, Trash } from "lucide-react";
import GroupChatAvatar from "../common/avatars/GroupChatAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import IconButton from "../common/buttons/IconButton";

const ConversationHeader = ({ selectedConversation }) => {
  const authUser = usePage().props.auth.user;
  const { emit } = useEventBus();

  const onDeleteGroup = () => {
    if (!window.confirm("Are you sure you want to delete this group?")) {
      return;
    }

    axios
      .delete(route("group.destroy", selectedConversation.id))
      .then((res) => {
        emit("toast.show", res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {selectedConversation && (
        <div className="p-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href={route("chat")} className="inline-block sm:hidden">
              <ArrowLeft className="w-6" />
            </Link>
            {selectedConversation.is_user && (
              <UserAvatar user={selectedConversation} />
            )}
            {selectedConversation.is_group && <GroupChatAvatar />}
            <div>
              <h3>{selectedConversation.name}</h3>
              {selectedConversation.is_group && (
                <p className="text-xs text-slate-500">
                  {selectedConversation.users.length} members
                </p>
              )}
            </div>
          </div>

          <div className="sm:hidden">
            {selectedConversation.is_group && (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <EllipsisVertical className="w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Club Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <GroupDescriptionPopover
                      description={selectedConversation.description}
                      text="Description"
                      size={16}
                    />
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <GroupUsersPopover
                      users={selectedConversation.users}
                      text="Club Members"
                      size={16}
                    />
                  </DropdownMenuItem>

                  {selectedConversation.owner_id === authUser.id && (
                    <>
                      <DropdownMenuItem
                        onClick={() =>
                          emit("GroupModal.show", selectedConversation)
                        }
                      >
                        <SquarePen className="w-4 mr-2" />
                        Edit Group
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={onDeleteGroup}>
                        <Trash className="w-4 mr-2" />
                        Delete Club
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <div className="hidden sm:flex gap-1 items-center">
            {selectedConversation.is_group && (
              <>
                {selectedConversation.owner_id === authUser.id && (
                  <>
                    <GroupDescriptionPopover
                      description={selectedConversation.description}
                      size={20}
                    />

                    <GroupUsersPopover
                      users={selectedConversation.users}
                      size={20}
                    />
                    <IconButton
                      onClick={() =>
                        emit("GroupModal.show", selectedConversation)
                      }
                      className="text-slate-900"
                    >
                      <SquarePen size={20} />
                    </IconButton>
                    <IconButton
                      onClick={onDeleteGroup}
                      className="text-slate-900"
                    >
                      <Trash size={20} />
                    </IconButton>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ConversationHeader;

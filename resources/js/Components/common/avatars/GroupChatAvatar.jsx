import { Users } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar-chat";

const GroupChatAvatar = ({ data }) => {
  return (
    <Avatar className="tooltip tooltip-right w-10" data-tip={data}>
      <AvatarImage src="" />
      <AvatarFallback>
        <Users className="w-4" />
      </AvatarFallback>
    </Avatar>
  );
};

export default GroupChatAvatar;

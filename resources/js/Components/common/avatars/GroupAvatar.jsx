import { Users } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";

const GroupAvatar = ({ data }) => {
  return (
    <Avatar className="tooltip tooltip-right " data-tip={data}>
      <AvatarImage src="" />
      <AvatarFallback>
        <Users className="w-4 " />
      </AvatarFallback>
    </Avatar>
  );
};

export default GroupAvatar;

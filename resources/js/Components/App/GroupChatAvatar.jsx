import { UsersIcon } from "@heroicons/react/24/solid";

const GroupChatAvatar = ({}) => {
  return (
    <>
      <div className={`placeholder avatar`}>
        <div className={`bg-blue-200 text-gray-800 rounded-full w-8`}>
          <span className="text-xl">
            <UsersIcon className="w-4" />
          </span>
        </div>
      </div>
    </>
  );
};
export default GroupChatAvatar;

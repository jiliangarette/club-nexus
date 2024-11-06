import { UsersIcon } from "@heroicons/react/24/solid";

const GroupAvatar = ({ data }) => {
  return (
    <div className="placeholder avatar tooltip tooltip-right " data-tip={data}>
      <div className="bg-blue-200 text-gray-800 rounded-full w-4 sm:w-8">
        <span className="text-xl">
          <UsersIcon className="w-3 sm:w-[14px]" />
        </span>
      </div>
    </div>
  );
};

export default GroupAvatar;

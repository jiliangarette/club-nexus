import { Skeleton } from "../ui/skeleton";

const ImageSkeleton = () => {
  return (
    <div className="flex flex-col">
      <Skeleton className="h-[150px] w-[150px] rounded-lg" />
    </div>
  );
};

export default ImageSkeleton;

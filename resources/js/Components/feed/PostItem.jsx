import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  MessageCircle,
  Share2,
  MoreHorizontal,
  ShieldCheck,
} from "lucide-react";
import { formatMessageDateShort } from "@/helper";
import { Link, usePage } from "@inertiajs/react";
import { useEventBus } from "@/EventBus";
import IconButton from "../common/buttons/IconButton";

export default function PostItem({
  username,
  content,
  createdAt,
  initialLikes = 0,
  isAdmin,
  avatar,
  carousel,
  postUserId,
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const { emit } = useEventBus();
  const page = usePage();
  const groupId = page.props.groupId;

  const handleLikeClick = () => {
    setIsLiked((prev) => {
      if (!prev) {
        setLikes((prevLikes) => prevLikes + 1); // Increment on like
      } else {
        setLikes((prevLikes) => Math.max(prevLikes - 1, 0)); // Decrement on unlike
      }
      return !prev; // Toggle the `isLiked` state
    });
  };

  const copyLink = () => {
    const link = `http://127.0.0.1:8000/feed/club/${groupId}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        emit("toast.show", "Link copied successfully!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        emit("toast.show", "Failed to copy the link.");
      });
  };

  const shareToFacebook = () => {
    const shareUrl = `http://127.0.0.1:8000/feed/club/${groupId}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(facebookUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Card className="w-full flex-wrap border-none mb-[1px] rounded-none hover:bg-slate-50 ">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1">
            {avatar}
            <div className="flex gap-1 flex-col leading-none">
              <span className="font-semibold text-nowrap flex">
                {username}
                {isAdmin && (
                  <ShieldCheck
                    fill="#008bff"
                    size={16}
                    className="text-white"
                  />
                )}
              </span>
              <div className="text-nowrap text-[10px] text-slate-500">
                {formatMessageDateShort(createdAt)}
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </IconButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={copyLink}>Copy link</DropdownMenuItem>
              <DropdownMenuItem>Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="px-4 pl-16 pb-2 text-md">
        <p>{content}</p>
      </CardContent>
      {carousel}
      <CardFooter className="px-8 pt-0 pl-16">
        <div className="flex gap-4 items-center">
          <div className="flex  items-center ">
            <IconButton
              variant="ghost"
              size="sm"
              className="gap-1 px-0 "
              onClick={handleLikeClick}
            >
              {isLiked ? (
                <lord-icon
                  src="https://cdn.lordicon.com/sbrtyqxj.json"
                  trigger="in"
                  style={{ width: "20px", height: "20px" }}
                ></lord-icon>
              ) : (
                <lord-icon
                  src="https://cdn.lordicon.com/vyqvtrtg.json"
                  trigger="in"
                  style={{ width: "20px", height: "20px" }}
                ></lord-icon>
              )}
            </IconButton>
            <div className="text-slate-500 text-md  w-4">
              {likes === 0 ? "" : likes}
            </div>
          </div>

          <Link href={`http://127.0.0.1:8000/chat/member/${postUserId}`}>
            <IconButton variant="ghost" size="sm" className="gap-1 px-0 ">
              <MessageCircle size={20} />
            </IconButton>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton variant="ghost" size="sm" className="gap-1 px-0 ">
                <Share2 size={20} />
              </IconButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={shareToFacebook}>
                Share to Facebook
              </DropdownMenuItem>
              <DropdownMenuItem onClick={copyLink}>Copy Link</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
}

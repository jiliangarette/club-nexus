import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Zap,
  MessageCircle,
  Share2,
  MoreHorizontal,
  ShieldCheck,
} from "lucide-react";
import { Button } from "../ui/button";
import { formatMessageDateShort } from "../../helper";

export default function PostItem({
  username,
  content,
  createdAt,
  likes,
  isAdmin,
  avatar,
  carousel,
}) {
  return (
    <Card className="w-full flex-wrap border-none mb-[1px] rounded-none hover:bg-gray-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1">
            {avatar}
            <div className="flex gap-1 flex-col leading-none">
              <span className="font-semibold text-nowrap flex">
                {username}
                {isAdmin && (
                  <ShieldCheck fill="#008bff" className="w-4 h-4 text-white" />
                )}
              </span>
              <div className="text-nowrap text-[10px] text-gray-500">
                {formatMessageDateShort(createdAt)}
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Copy link</DropdownMenuItem>
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
          <Button variant="ghost" size="sm" className="gap-1 px-0 w-8 h-8">
            <Zap className="h-4 w-4" />
            <span className="text-gray-500 text-sm">{likes}</span>
          </Button>

          <Button variant="ghost" size="sm" className="gap-1 px-0 w-8 h-8">
            <MessageCircle className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 px-0 w-8 h-8">
                <Share2 className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Share to Facebook</DropdownMenuItem>
              <DropdownMenuItem>Copy Link</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
}

import * as React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import PrimaryButton from "../PrimaryButton";

import { Bold, Code, Image, Italic, List, Paperclip, Plus } from "lucide-react";

export function PostCreationDrawer() {
  const [postContent, setPostContent] = React.useState("");

  const handleSubmit = () => {
    console.log("Post submitted:", postContent);
    setPostContent("");
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <PrimaryButton
          className="py-2 px-[8px] tooltip tooltip-left"
          data-tip="Create Post"
        >
          <Plus className="h-7 w-7" aria-hidden="true" />
        </PrimaryButton>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm sm:max-w-md h-[600px] md:h-1/2">
          <DrawerHeader>
            <DrawerTitle>Create Post</DrawerTitle>
            <DrawerDescription>
              Share your thoughts with your club members!
            </DrawerDescription>
          </DrawerHeader>
          <textarea
            className="w-full h-3/5 sm:h-48 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 resize-none"
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <div className="flex justify-between mt-4">
            <div className="flex space-x-2">
              <button
                aria-label="Add Photo"
                className="p-2 rounded hover:bg-shade"
              >
                <Image className="h-5 w-5 text-gray-600" />
              </button>
              <button
                aria-label="Attach File"
                className="p-2 rounded hover:bg-shade"
              >
                <Paperclip className="h-5 w-5 text-gray-600" />
              </button>
              <button aria-label="Bold" className="p-2 rounded hover:bg-shade">
                <Bold className="h-5 w-5 text-gray-600" />
              </button>
              <button
                aria-label="Italic"
                className="p-2 rounded hover:bg-shade"
              >
                <Italic className="h-5 w-5 text-gray-600" />
              </button>
              <button aria-label="List" className="p-2 rounded hover:bg-shade">
                <List className="h-5 w-5 text-gray-600" />
              </button>
              <button
                aria-label="Code Block"
                className="p-2 rounded hover:bg-shade"
              >
                <Code className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
          <DrawerFooter className="flex justify-between mt-4 pb-4 px-2">
            <DrawerClose asChild>
              <PrimaryButton className="bg-shade text-gray-700 hover:bg-gray-300">
                Cancel
              </PrimaryButton>
            </DrawerClose>
            <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default PostCreationDrawer;

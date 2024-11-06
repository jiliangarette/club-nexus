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
import {
  Bold,
  Code,
  Image,
  Italic,
  List,
  Paperclip,
  Plus,
  XCircleIcon,
} from "lucide-react";

import PrimaryButton from "../PrimaryButton";
import { useState } from "react";
import { isImage } from "@/helper";
import axios from "axios";
import { route } from "ziggy-js";
import NewPostInput from "./NewPostInput";
import AttachmentPreview from "./AttachmentPreview";

export function PostCreationDrawer({ feed = null, onPostData }) {
  const [newPost, setNewPost] = useState("");
  const [inputErrorPost, setInputErrorPost] = useState("");
  const [chosenFiles, setChosenFiles] = useState([]);
  const [postSending, setPostSending] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onFileChange = (ev) => {
    const files = ev.target.files;

    const updatedFiles = [...files].map((file) => {
      return {
        file: file,
        url: URL.createObjectURL(file),
      };
    });
    ev.target.value = null;

    setChosenFiles((prevFiles) => {
      return [...prevFiles, ...updatedFiles];
    });
  };

  const onSendClick = () => {
    if (postSending) {
      return;
    }
    if (newPost.trim() === "" && chosenFiles.length === 0) {
      setInputErrorPost("Please provide a text or upload attachment.");

      setTimeout(() => {
        setInputErrorPost("");
      }, 3000);
      return;
    }
    const formData = new FormData();

    chosenFiles.forEach((file) => {
      formData.append("attachments[]", file.file);
    });
    formData.append("content", newPost);
    if (feed.is_user) {
      formData.append("receiver_id", feed.id);
    } else if (feed.is_group) {
      formData.append("group_id", feed.id);
    }
    setPostSending(true);
    axios
      .post(route("post.store"), formData, {
        onUploadProgress: (ProgressEvent) => {
          const progress = Math.round(
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          );
          setUploadProgress(progress);
        },
      })
      .then((response) => {
        console.log("Response:", response);
        const sendDummyDataToParent = () => {
          if (onPostData) {
            onPostData(response.data);
          }
        };
        sendDummyDataToParent();
        setNewPost("");
        setPostSending(false);
        setUploadProgress(0);
        setChosenFiles([]);
      })
      .catch((error) => {
        console.error("Error:", error); // Log error for more info
        setPostSending(false);
        setChosenFiles([]);
        const postError = error?.response?.data?.post;
        setInputErrorPost(postError || "An error occurred while sending post");
      });
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
        <DrawerHeader>
          <DrawerTitle>Create Post</DrawerTitle>
          <DrawerDescription>
            Share your thoughts with your club members!
          </DrawerDescription>
        </DrawerHeader>

        <NewPostInput
          value={newPost}
          onSend={onSendClick}
          onChange={(ev) => setNewPost(ev.target.value)}
        />
        <div className="flex justify-between mt-4">
          <div className="flex space-x-2">
            <button
              aria-label="Add Photo"
              className="p-2 rounded hover:bg-shade relative"
            >
              <Image className="h-5 w-5 text-gray-600" />
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={onFileChange}
                className="absolute left-0 top-0 right-0 bottom-0 z-20 opacity-0 cursor-pointer"
              />
            </button>
            <button
              aria-label="Attach File"
              className="p-2 rounded hover:bg-shade relative"
            >
              <Paperclip className="h-5 w-5 text-gray-600" />
              <input
                type="file"
                onChange={onFileChange}
                className="absolute left-0 top-0 right-0 bottom-0 z-20 opacity-0 cursor-pointer"
              />
            </button>
            <button aria-label="Bold" className="p-2 rounded hover:bg-shade">
              <Bold className="h-5 w-5 text-gray-600" />
            </button>
            <button aria-label="Italic" className="p-2 rounded hover:bg-shade">
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
          {!!uploadProgress && (
            <progress
              className="progress progress-info w-full"
              value={uploadProgress}
              max="100"
            ></progress>
          )}
          {inputErrorPost && (
            <span className="text-xs text-red-400">{inputErrorPost}</span>
          )}

          <div className="flex flex-wrap gap-1 mt-2">
            {chosenFiles.map((file) => (
              <div
                key={file.file.name}
                className={
                  `relative flex justify-between cursor-pointer` +
                  (!isImage(file.file) ? "w-[240px]" : "")
                }
              >
                {isImage(file.file) && (
                  <img
                    src={file.url}
                    alt=""
                    className="w-16 h-16 object-cover"
                  />
                )}
                {!isImage(file.file) && <AttachmentPreview file={file} />}

                <button
                  onClick={() =>
                    setChosenFiles(
                      chosenFiles.filter((f) => f.file.name !== file.file.name)
                    )
                  }
                  className="absolute w-6 h-6 rounded-full bg-gray-800 -right-2 -top-2 text-gray-300 hover:text-gray-100 z-10"
                >
                  <XCircleIcon className="w-6" />
                </button>
              </div>
            ))}
          </div>

          <DrawerClose asChild>
            <PrimaryButton onClick={onSendClick} disabled={postSending}>
              Submit
            </PrimaryButton>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default PostCreationDrawer;

import * as React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Image, ImagePlus, Plus, XCircleIcon } from "lucide-react";
import axios from "axios";
import { route } from "ziggy-js";
import { Button } from "../ui/button";
import IconButton from "../common/buttons/IconButton";
import { useState } from "react";
import { usePage } from "@inertiajs/react";
import { Input } from "../ui/input";
import TextAreaInput from "../common/inputs/TextAreaInput";
import InputLabel from "../common/inputs/InputLabel";

export function CreateAnnouncement() {
  const page = usePage();
  const conversations = page.props.conversations || [];
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [inputError, setInputError] = useState("");
  const [chosenFiles, setChosenFiles] = useState([]);
  const [sending, setSending] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [groupId, setGroupId] = useState(""); // Add state for groupId

  const onFileChange = (ev) => {
    const files = ev.target.files;
    const updatedFiles = [...files].map((file) => ({
      file: file,
      url: URL.createObjectURL(file),
    }));
    ev.target.value = null;

    const imageFiles = updatedFiles.filter((file) =>
      file.file.type.startsWith("image/")
    );

    setChosenFiles((prevFiles) => [...prevFiles, ...imageFiles]);
  };

  const onSendClick = () => {
    if (sending) return;

    if (!title.trim() || !content.trim() || !date.trim() || !groupId) {
      setInputError(
        "Please provide a title, content, date, and select a group."
      );
      setTimeout(() => setInputError(""), 3000);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("date", date);
    formData.append("group_id", groupId); // Add group_id to the formData
    chosenFiles.forEach((file) => formData.append("attachments[]", file.file));

    setSending(true);
    axios
      .post(route("announcement.store"), formData, {
        onUploadProgress: (event) => {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progress);
        },
      })
      .then((response) => {
        setTitle("");
        setContent("");
        setDate("");
        setGroupId("");
        setChosenFiles([]);
        setUploadProgress(0);
        setSending(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setInputError("An error occurred while sending the announcement.");
        setSending(false);
      });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <IconButton
          className="tooltip tooltip-left bg-slate-900"
          data-tip="Create an Announcement"
        >
          <Plus className="h-7 w-7 text-slate-50" />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent>
        <div className="w-full sm:w-1/2 mx-auto sm:px-4">
          <DrawerHeader>
            <DrawerTitle>Post New Announcement</DrawerTitle>
          </DrawerHeader>

          <div className="space-y-3">
            <div className="">
              <h3 className="w-full text-center font-semibold text-gray-900">
                Select Club
              </h3>

              <ul className="text-sm font-medium text-gray-900 border rounded-lg flex">
                {conversations
                  .filter((conversation) => conversation.is_group)
                  .map((conversation) => (
                    <li
                      className="w-full border-b bg-slate-50 hover:bg-slate-200 transition-all duration-300 ease-in-out rounded-t-lg"
                      key={conversation.id}
                    >
                      <div className="flex items-center ps-3">
                        <input
                          type="radio"
                          value={conversation.id}
                          name="group_id"
                          onChange={(e) => setGroupId(e.target.value)}
                        />
                        <label
                          htmlFor="list-radio-passport"
                          className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
                        >
                          {conversation.name}
                        </label>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="w-full flex flex-col">
              <div>Announcement Title</div>

              <Input
                type="text"
                placeholder="Enter the title here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col">
              <div>Announcement Content</div>
              <TextAreaInput
                rows="7"
                placeholder="Write your announcement message here..."
                value={content}
                className="w-full"
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {/* Date */}
            <div>
              <InputLabel>Announcement Date</InputLabel>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <div className="flex space-x-2">
              <button aria-label="Add Banner Image" className="p-2 relative">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onFileChange}
                  className="absolute left-0 top-0 right-0 bottom-0 z-20 opacity-0 cursor-pointer"
                />
                <Button variant="secondary" className="p-3 rounded-md text-sm">
                  Add Image <ImagePlus />
                </Button>
              </button>
            </div>
          </div>

          <div className="flex justify-between mt-4 pb-4">
            {uploadProgress > 0 && (
              <progress
                className="progress progress-info w-full"
                value={uploadProgress}
                max="100"
              />
            )}
            {inputError && (
              <span className="text-xs text-red-400">{inputError}</span>
            )}

            <div className="flex flex-wrap gap-2 mt-2">
              {chosenFiles.map((file) => (
                <div
                  key={file.file.name}
                  className="relative flex justify-between cursor-pointer"
                >
                  <button
                    onClick={() =>
                      setChosenFiles(
                        chosenFiles.filter(
                          (f) => f.file.name !== file.file.name
                        )
                      )
                    }
                    className="absolute w-6 h-6 rounded-full bg-slate-800 -right-2 -top-2 text-slate-300 hover:text-slate-100"
                  >
                    <XCircleIcon className="w-6" />
                  </button>
                  <img
                    src={file.url}
                    alt="chosen-file"
                    className="h-12 w-12 object-cover rounded-md"
                  />
                </div>
              ))}
            </div>

            <div className="flex space-x-2 mt-4">
              <Button variant="outline" onClick={() => setChosenFiles([])}>
                Clear Files
              </Button>
              <DrawerClose asChild>
                <Button onClick={onSendClick} disabled={sending}>
                  {sending ? "Posting..." : "Publish Announcement"}
                </Button>
              </DrawerClose>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default CreateAnnouncement;

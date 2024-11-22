import { useEffect, useState } from "react";
import NewMessageInput from "./NewMessageInput";
import { route } from "ziggy-js";
import EmojiPicker from "emoji-picker-react";
import { Popover } from "@headlessui/react";
import axios from "axios";
import CustomAudioPlayer from "../common/media/CustomAudioPlayer";
import AttachmentPreview from "../common/media/AttachmentPreview";
import { isAudio, isImage } from "@/helper";
import AudioRecorder from "../common/media/AudioRecorder";
import Loading from "../Loading/Loading";
import { Button } from "../ui/button";
import {
  ArrowUp,
  Folder,
  Image,
  Paperclip,
  Plus,
  SmileIcon,
  ThumbsUp,
  XCircle,
} from "lucide-react";
import IconButton from "../common/buttons/IconButton";
import useScreenSize from "@/use-screensize";
import { Progress } from "../ui/progress";

const MessageInput = ({ conversation = null }) => {
  const { isDesktop, isMobile, isTablet } = useScreenSize();
  const [newMessage, setNewMessage] = useState("");
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const [messageSending, setMessageSending] = useState(false);
  const [chosenFiles, setChosenFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isIconsVisible, setIconVisible] = useState(true);
  const [isFocus, setIsFocus] = useState(false);

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
    if (messageSending) {
      return;
    }
    if (newMessage.trim() === "" && chosenFiles.length === 0) {
      setInputErrorMessage("Please provide a message or upload attachment.");

      setTimeout(() => {
        setInputErrorMessage("");
      }, 3000);
      return;
    }
    const formData = new FormData();

    chosenFiles.forEach((file) => {
      formData.append("attachments[]", file.file);
    });

    formData.append("message", newMessage);
    if (conversation.is_user) {
      formData.append("receiver_id", conversation.id);
    } else if (conversation.is_group) {
      formData.append("group_id", conversation.id);
    }
    setMessageSending(true);
    axios
      .post(route("message.store"), formData, {
        onUploadProgress: (ProgressEvent) => {
          const progress = Math.round(
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          );
          setUploadProgress(progress);
        },
      })
      .then((response) => {
        setNewMessage("");
        setMessageSending(false);
        setUploadProgress(0);
        setChosenFiles([]);
      })
      .catch((error) => {
        setMessageSending(false);
        setChosenFiles([]);
        const message = error?.response?.data?.message;
        setInputErrorMessage(
          message || "An error occured while sending message"
        );
      });
  };
  const onLikeClick = () => {
    if (messageSending) {
      return;
    }

    const data = {
      message: "👍🏻",
    };

    if (conversation.is_user) {
      data["receiver_id"] = conversation.id;
    } else if (conversation.is_group) {
      data["group_id"] = conversation.id;
    }

    axios.post(route("message.store"), data);
  };

  const recordedAudioReady = (file, url) => {
    setChosenFiles((prevFiles) => [...prevFiles, { file, url }]);
  };

  const handleFocus = () => {
    setIsFocus(true);
    setIconVisible(false);
  };

  const handleBlur = () => {
    setIsFocus(false);
    setIconVisible(true);
  };

  const handleIconVisibility = () => {
    setIconVisible(true);
  };

  const desktopScreen = () => {
    if (isDesktop) {
      setIsFocus(true);
    }
  };

  useEffect(() => {
    desktopScreen();
  }, [isDesktop]);
  return (
    <div className="flex flex-wrap items-start sm:border-t sm:border-slate-300 sm:p-4 p-2">
      <div className="flex flex-col w-full bg-transparent sm:bg-slate-100 rounded-lg justify-center sm:p-2">
        {!!uploadProgress ? (
          <div className="flex justify-center">
            <Progress value={uploadProgress} className="w-[60%]" />
          </div>
        ) : (
          <div className=" h-2 w-full"></div>
        )}
        {inputErrorMessage && (
          <span className="text-xs text-red-400">{inputErrorMessage}</span>
        )}
        <div className="flex flex-wrap gap-1 ">
          {chosenFiles.map((file) => (
            <div
              key={file.file.name}
              className={
                `relative flex justify-between cursor-pointer group border rounded-lg` +
                (!isImage(file.file) ? "w-[240px]" : "")
              }
            >
              {isImage(file.file) && (
                <img src={file.url} alt="" className="w-16 h-16 object-cover" />
              )}
              {isAudio(file.file) && (
                <CustomAudioPlayer file={file} showVolume={false} />
              )}
              {!isAudio(file.file) && !isImage(file.file) && (
                <AttachmentPreview file={file} />
              )}

              <button
                onClick={() =>
                  setChosenFiles(
                    chosenFiles.filter((f) => f.file.name !== file.file.name)
                  )
                }
                className="absolute   rounded-full  -right-2 -top-2 group-hover:opacity-100 opacity-0 z-10"
              >
                <XCircle className=" hover:text-white hover:bg-slate-800 rounded-full" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-row rounded-lg  w-full relative place-items-end justify-center">
          {isMobile && (
            <div>
              {isIconsVisible ? (
                <div className="flex h-full">
                  <IconButton className="p-1  relative ">
                    <Image />
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={onFileChange}
                      className="absolute left-0 top-0 right-0 bottom-0 z-20 pt-10 opacity-0 cursor-pointer"
                    />
                  </IconButton>

                  <IconButton className="p-1  relative ">
                    <Folder />
                    <input
                      type="file"
                      onChange={onFileChange}
                      className="absolute left-0 top-0 right-0 bottom-0 z-20 pt-10 opacity-0 cursor-pointer"
                    />
                  </IconButton>
                  <Popover className="relative">
                    <Popover.Button className="p-1 nline-flex items-center px-2 py-2 rounded-md font-bold text-sm tracking-normal active:scale-90 disabled:opacity-25 hover:bg-slate-200 transition-all duration-300 ease-in-out flex-col sm:flex-row relative text-slate-600">
                      <SmileIcon />
                    </Popover.Button>
                    <Popover.Panel className="absolute z-10 left-0 bottom-full">
                      <EmojiPicker
                        theme="light"
                        onEmojiClick={(ev) =>
                          setNewMessage(newMessage + ev.emoji)
                        }
                      ></EmojiPicker>
                    </Popover.Panel>
                  </Popover>
                </div>
              ) : (
                <IconButton
                  onClick={handleIconVisibility}
                  className="bg-slate-200 rounded-lg  absolute bottom-0 left-0"
                >
                  <Plus />
                </IconButton>
              )}
            </div>
          )}
          {isDesktop && (
            <div className="flex ">
              <IconButton className="p-1  relative">
                <Paperclip />
                <input
                  type="file"
                  onChange={onFileChange}
                  className="absolute left-0 top-0 right-0 bottom-0 z-20  pt-10 opacity-0 cursor-pointer"
                />
              </IconButton>
              <IconButton className="p-1 relative">
                <Image />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onFileChange}
                  className="absolute left-0 top-0 right-0 bottom-0 z-20 pt-10 opacity-0 cursor-pointer"
                />
              </IconButton>

              <Popover className="relative">
                <Popover.Button className="p-1 nline-flex items-center px-2 py-2 rounded-md font-bold text-sm tracking-normal active:scale-90 disabled:opacity-25 hover:bg-slate-200 transition-all duration-300 ease-in-out flex-col sm:flex-row relative text-slate-600">
                  <SmileIcon />
                </Popover.Button>
                <Popover.Panel className="absolute z-10 left-0 bottom-full">
                  <EmojiPicker
                    theme="light"
                    onEmojiClick={(ev) => setNewMessage(newMessage + ev.emoji)}
                  ></EmojiPicker>
                </Popover.Panel>
              </Popover>
            </div>
          )}
          <div className="flex-1 ">
            <div className="relative w-full  flex justify-center  ">
              <NewMessageInput
                value={newMessage}
                onChange={(ev) => setNewMessage(ev.target.value)}
                onSend={onSendClick}
                isFocus={isFocus}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {!isFocus ||
                (isDesktop && (
                  <div className="absolute flex items-center justify-center  w-12 right-0 bottom-0  ">
                    <AudioRecorder fileReady={recordedAudioReady} />
                  </div>
                ))}
              {!isFocus && (
                <div className="absolute flex items-center justify-center  w-12 right-0 bottom-0  ">
                  <AudioRecorder fileReady={recordedAudioReady} />
                </div>
              )}
            </div>
          </div>

          <div>
            {chosenFiles.length > 0 || newMessage.length > 0 ? (
              <IconButton
                onClick={onSendClick}
                disabled={messageSending}
                className="bg-slate-800 text-slate-100 rounded-lg"
              >
                {messageSending ? (
                  <Loading size="md" />
                ) : (
                  <ArrowUp strokeWidth={2} className="text-slate-100" />
                )}
              </IconButton>
            ) : (
              <IconButton
                onClick={onLikeClick}
                className="sm:bg-transparent bg-slate-200 rounded-lg p-2"
              >
                <ThumbsUp />
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;

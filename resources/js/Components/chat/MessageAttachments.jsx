import { isAudio, isImage, isPDF, isPreviewable, isVideo } from "@/helper";
import { FileDown, Paperclip, PlayCircle } from "lucide-react";

function MessageAttachments({ attachments, attachmentClick }) {
  return (
    <>
      {attachments.length > 0 && (
        <div className="mt-2 flex flex-wrap justify-end gap-1">
          {attachments.map((attachment, ind) => (
            <div
              onClick={(ev) => attachmentClick(attachments, ind)}
              key={attachment.id}
              className={`group flex flex-col items-center justify-center
                                text-slate-500 relative cursor-pointer ${
                                  isAudio(attachment)
                                    ? "w-84"
                                    : attachments.length < 2
                                    ? "w-60"
                                    : "w-36"
                                }`}
            >
              {!isAudio(attachment) && (
                <a
                  onClick={(ev) => ev.stopPropagation()}
                  download
                  href={attachment.url}
                  className="z-20 opacity-75 group-hover:opacity-100 transition-all h-8 w-8 flex items-center justify-center  rounded absolute right-0 top-0  cursor-pointer 0 opacity"
                >
                  <FileDown size={15} className=" hover:text-slate-200" />
                </a>
              )}

              {isImage(attachment) && (
                <img
                  src={attachment.url}
                  className="object-contain rounded-lg"
                />
              )}
              {isVideo(attachment) && (
                <div className="relative flex justify-center items-center">
                  <PlayCircle
                    strokeWidth={1}
                    className="z-20 absolute w-16 h-16 text-slate-200 opacity-70"
                  />
                  <div className="absolute left-0 top-0 w-full h-full bg-black/50 z-10"></div>
                  <video src={attachment.url}></video>
                </div>
              )}
              {isAudio(attachment) && (
                <div className="relative flex justify-center items-center">
                  <audio src={attachment.url} controls></audio>
                </div>
              )}
              {isPDF(attachment) && (
                <div className=" relative flex justify-center items-center">
                  <iframe
                    src={attachment.url}
                    className="w-full h-full"
                  ></iframe>
                </div>
              )}
              {!isPreviewable(attachment) && (
                <a
                  onClick={(ev) => ev.stopPropagation()}
                  download
                  href={attachment.url}
                  className="flex flex-col justify-center items-center"
                >
                  <Paperclip className="w-10 h-10 mb-3" />
                  <small className="text-center">{attachment.name}</small>
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default MessageAttachments;

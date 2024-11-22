import { Fragment, useEffect, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { isAudio, isImage, isPDF, isPreviewable, isVideo } from "@/helper";
import { ChevronLeft, ChevronRight, Paperclip, X } from "lucide-react";
import { Button } from "@/Components/ui/button";

export default function AttachmentPreviewModal({
  attachments,
  index,
  show = false,
  onClose = () => {},
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const previewableAttachments = useMemo(() => {
    return attachments.filter((attachment) => isPreviewable(attachment));
  }, [attachments]);

  const attachment = useMemo(() => {
    return attachments[currentIndex];
  }, [attachments, currentIndex]);

  const close = () => {
    onClose();
  };

  const prev = () => {
    if (currentIndex === 0) {
      return;
    }
    setCurrentIndex(currentIndex - 1);
  };

  const next = () => {
    if (currentIndex === previewableAttachments.length - 1) {
      return;
    }
    setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    setCurrentIndex(index);
  }, [index]);
  return (
    <Transition show={show} as={Fragment} leave="duration-200">
      <Dialog as="div" id="modal" className="relative z-50 " onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leave-to="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto select-none ">
          <div className="h-screen w-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="flex flex-col w-full h-full transform overflow-hidden bg-gradient-to-r from-slate-400 via-slate-50 to-slate-500 text-left align-middle shadow-xl transition-all">
                <Button
                  onClick={close}
                  className="absolute right-3 top-3 h-10 w-10 rounded-full z-40"
                >
                  <X className="h-6 w-6" />
                </Button>
                <div className="relative group h-full">
                  {currentIndex > 0 && (
                    <div
                      onClick={prev}
                      className="absolute opacity-100 text-slate-100 cursor-pointer flex items-center justify-center w-16 h-16 left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/20 transition-all duration-300 ease-in-out z-30 "
                    >
                      <ChevronLeft className="w-12" />
                    </div>
                  )}
                  {currentIndex < previewableAttachments.length - 1 && (
                    <div
                      onClick={next}
                      className="absolute opacity-100 text-slate-100 cursor-pointer flex items-center justify-center w-16 h-16 right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/20  transition-all duration-300 ease-in-out z-30 "
                    >
                      <ChevronRight className="w-12" />
                    </div>
                  )}

                  {attachment && (
                    <div className="flex items-center justify-center w-full h-full p-3">
                      {isImage(attachment) && (
                        <img
                          src={attachment.url}
                          className="max-w-full max-h-full rounded-lg"
                        />
                      )}
                      {isVideo(attachment) && (
                        <div className="flex items-cente rounded-lg">
                          <video src={attachment.url} controls autoPlay />
                        </div>
                      )}
                      {isAudio(attachment) && (
                        <div className="relative flex justify-center items-center rounded-lg">
                          <audio src={attachment.url} controls autoPlay />
                        </div>
                      )}
                      {isPDF(attachment) && (
                        <iframe
                          src={attachment.url}
                          className="w-full h-full rounded-lg"
                        ></iframe>
                      )}
                      {!isPreviewable(attachment) && (
                        <div className="p-32 flex flex-col justify-center items-center text-slate-100 rounded-lg">
                          <Paperclip className="w-10 h-10 mb-3" />
                          <small>{attachment.name}</small>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

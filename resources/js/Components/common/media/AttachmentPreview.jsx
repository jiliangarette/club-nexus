import React from "react";
import { formatBytes, isPDF, isPreviewable } from "@/helper";
import { Paperclip } from "lucide-react";

function AttachmentPreview({ file }) {
  return (
    <div className="w-full flex items-center gap-2 py-2 px-3 rounded-md bg-slate-800">
      <div>
        {isPDF(file.file) && (
          <img src="http://127.0.0.1:8000/img/pdf.png" className="w-8" />
        )}
        {!isPreviewable(file.file) && (
          <div className="flex justify-center items-center w-10 h-10 bg-slate-700 rounded">
            <Paperclip className="w-6" />
          </div>
        )}
      </div>
      <div className="flex-1 text-slate-400 text-nowrap text-ellipsis overflow-hidden">
        <h3> {file.file.name} </h3>
        <p className="text-xs">{formatBytes(file.file.size)}</p>
      </div>
    </div>
  );
}
export default AttachmentPreview;
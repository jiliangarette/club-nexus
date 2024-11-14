import PrimaryButton from "../common/buttons/PrimaryButton";
import { AtSign, FilePlus, Image } from "lucide-react";

const CreatePostInput = () => {
  return (
    <form>
      <div className="w-full mb-4 border border-slate-200 rounded-lg">
        <div className="px-4 py-2 bg-white rounded-t-lg">
          <label for="post" className="sr-only">
            Your post
          </label>
          <textarea
            id="post"
            rows="2"
            className="w-full px-0 text-sm text-slate-900 border-0 focus:ring-0 placeholder-slate-400"
            placeholder="Write a post..."
            required
          ></textarea>
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t border-slate-200">
          <PrimaryButton type="submit">Post</PrimaryButton>
          <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
            <button
              type="button"
              className="inline-flex justify-center items-center p-2 text-slate-500 rounded cursor-pointer hover:text-slate-900 bg-slate-50 hover:bg-slate-100"
            >
              <FilePlus className="w-4 h-4" />
              <span className="sr-only">Attach file</span>
            </button>
            <button
              type="button"
              className="inline-flex justify-center items-center p-2 text-slate-500 rounded cursor-pointer hover:text-slate-900 bg-slate-50 hover:bg-slate-100"
            >
              <AtSign className="w-4 h-4" />
              <span className="sr-only">Tag a person</span>
            </button>
            <button
              type="button"
              className="inline-flex justify-center items-center p-2 text-slate-500 rounded cursor-pointer hover:text-slate-900 bg-slate-50 hover:bg-slate-100"
            >
              <Image className="w-4 h-4" />
              <span className="sr-only">Upload image</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreatePostInput;

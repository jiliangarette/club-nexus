import {
  AtSymbolIcon,
  DocumentPlusIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import PrimaryButton from "../PrimaryButton";

const CreatePostInput = () => {
  return (
    <form>
      <div className="w-full mb-4 border border-gray-200 rounded-lg">
        <div className="px-4 py-2 bg-white rounded-t-lg">
          <label for="post" className="sr-only">
            Your post
          </label>
          <textarea
            id="post"
            rows="2"
            className="w-full px-0 text-sm text-gray-900 border-0 focus:ring-0 placeholder-gray-400"
            placeholder="Write a post..."
            required
          ></textarea>
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200">
          <PrimaryButton type="submit">Post</PrimaryButton>
          <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
            <button
              type="button"
              className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
            >
              <DocumentPlusIcon className="w-4 h-4" />
              <span className="sr-only">Attach file</span>
            </button>
            <button
              type="button"
              className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
            >
              <AtSymbolIcon className="w-4 h-4" />
              <span className="sr-only">Tag a person</span>
            </button>
            <button
              type="button"
              className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
            >
              <PhotoIcon className="w-4 h-4" />
              <span className="sr-only">Upload image</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreatePostInput;
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FeedLayout from "@/Layouts/FeedLayout";
import { NewspaperIcon } from "@heroicons/react/24/solid";

function Home() {
  return (
    <div className=" pr-5 py-5 ml-5 h-full">
      <div className="w-full h-full bg-white shadow-sm rounded-lg overflow-hidden flex flex-col">
        {true && (
          <div className="flex flex-col gap-8 justify-center items-center text-center h-full opacity-35">
            <div className="text-2xl md:text-4xl p-16 text-text-gray-800">
              Please select clubs to see its feed
            </div>
            <NewspaperIcon className="w-32 h-32 inline-block" />
          </div>
        )}
        {false && (
          <>
            <div className="flex h-1/6 w-full bg-red-400">HOME</div>
            <div className="flex h-full w-full bg-blue-400">Body</div>
            <div className="flex h-1/6 w-full bg-green-400">Footer</div>
          </>
        )}
      </div>
    </div>
  );
}

Home.layout = (page) => {
  return (
    <AuthenticatedLayout user={page.props.auth.user}>
      <FeedLayout children={page} />
    </AuthenticatedLayout>
  );
};

export default Home;

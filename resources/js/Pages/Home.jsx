import ChatLayout from "@/Layouts/ChatLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FeedLayout from "@/Layouts/FeedLayout";

function Home() {
  return (
    <div className=" pr-5 py-5 ml-5 h-full">
      <div className="w-full h-full bg-white shadow-sm rounded-lg overflow-hidden flex flex-col">
        <div className="flex h-1/6 w-full bg-red-400">HOME</div>
        <div className="flex h-full w-full bg-blue-400">Body</div>
        <div className="flex h-1/6 w-full bg-green-400">Footer</div>
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

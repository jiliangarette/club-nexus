import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { AlertCircle, Megaphone, Plus, PlusCircle } from "lucide-react";

import LoadingState from "@/Components/Loading/LoadingState";
import AuthenticatedLayout from "@/layout/AuthenticatedLayout";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import DefaultChatDisplay from "@/Components/chat/DefaultChatDisplay";
import AnnouncementLayout from "@/layout/AnnouncementLayout";

function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const page = usePage();
  const groupId = page.props.groupId;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/post/group/${groupId}/posts`
        );

        setError(null);
      } catch (err) {
        setError(
          err.response ? err.response.data.message : "An error occurred"
        );
        console.log(err.response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [groupId]);

  const renderAnnouncementContent = () => {
    if (!groupId) {
      return (
        <div className="w-full h-full flex flex-col gap-2 place-items-center justify-center ">
          <div>
            {/* <Megaphone size={80} strokeWidth={1} /> */}
            <lord-icon
              src="https://cdn.lordicon.com/rkokkkky.json"
              trigger="loop"
              style={{ width: "60px", height: "60px" }}
            ></lord-icon>
          </div>
          <div className="text-2xl text-center ">Announcement</div>
          <div className="fixed right-4 sm:right-8 sm:bottom-8 bottom-4">
            <div className="bg-gradient-to-bl from-slate-100 to-slate-300 p-2 rounded-full">
              <Plus size={32} />
            </div>
          </div>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="fixed top-1/2 ">
          <LoadingState />
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-red-600 text-xl">
          <Alert variant="destructive" className="bg-red-100">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="fixed right-4 sm:right-8 sm:bottom-8 bottom-4">
            <PlusCircle size={36} />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex justify-between">
      <div className="w-full min-h-screen h-full bg-white shadow-lg rounded-xl  flex flex-col overflow-hidden lg:mx-12">
        <div className="flex justify-center items-center h-full flex-col">
          {renderAnnouncementContent()}
        </div>
      </div>

      <div className="hidden sm:flex sm:w-[30px] lg:w-[300px]"></div>
    </div>
  );
}

Home.layout = (page) => (
  <AuthenticatedLayout user={page.props.auth.user}>
    <AnnouncementLayout>{page}</AnnouncementLayout>
  </AuthenticatedLayout>
);

export default Home;

import { useEffect, useState, useCallback } from "react";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { AlertCircle, Megaphone, Plus, PlusCircle } from "lucide-react";

import LoadingState from "@/Components/Loading/LoadingState";
import AuthenticatedLayout from "@/layout/AuthenticatedLayout";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import AnnouncementLayout from "@/layout/AnnouncementLayout";
import AnnouncementItem from "@/Components/announcement/AnnouncementItem";
import CreateAnnouncement from "@/Components/announcement/CreateAnnouncement";

const Announcement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [announcementList, setAnnouncementList] = useState([]);
  const page = usePage();
  const isAdmin = page.props.auth.user.is_admin;

  const [postData, setPostData] = useState(null);

  const handlePostData = (data) => {
    setPostData(data);
  };

  const fetchAnnouncements = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/announcements");
      setAnnouncementList(data.announcements || []);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(
        error.response
          ? error.response.data.message
          : "Unable to fetch announcements."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="w-full flex justify-center items-center">
          <LoadingState />
        </div>
      );
    }

    if (errorMessage) {
      return (
        <div className="text-red-600 text-xl">
          <Alert variant="destructive" className="bg-red-100">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
          <div className="fixed right-4 sm:right-8 sm:bottom-8 bottom-4">
            <PlusCircle size={36} />
          </div>
        </div>
      );
    }

    if (announcementList.length === 0) {
      return (
        <div className="w-full h-full flex flex-col gap-2 place-items-center justify-center">
          <Megaphone size={80} strokeWidth={1} />
          <div className="text-2xl text-center">No announcements found</div>
          <div className="fixed right-4 sm:right-8 sm:bottom-8 bottom-4">
            <div className="bg-gradient-to-bl from-slate-100 to-slate-300 p-2 rounded-full">
              <Plus size={32} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="p-4 flex flex-col gap-2 justify-start h-full w-full">
        {announcementList.map((announcement, index) => (
          <AnnouncementItem key={index} announcement={announcement} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex justify-between">
      <div className="w-full min-h-screen h-full bg-white shadow-lg rounded-xl flex flex-col overflow-hidden lg:mx-12">
        <div className="flex justify-center items-center h-full flex-col">
          {renderContent()}
          <div className="fixed right-4 sm:right-8 sm:bottom-8 bottom-4">
            <CreateAnnouncement />
          </div>
        </div>
      </div>
      <div className="hidden sm:flex sm:w-[30px] lg:w-[300px]"></div>
    </div>
  );
};

Announcement.layout = (page) => (
  <AuthenticatedLayout user={page.props.auth.user}>
    <AnnouncementLayout>{page}</AnnouncementLayout>
  </AuthenticatedLayout>
);

export default Announcement;

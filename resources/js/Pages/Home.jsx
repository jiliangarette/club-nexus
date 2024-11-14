import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { AlertCircle, NewspaperIcon } from "lucide-react";

import DefaultHomeDisplay from "@/Components/feed/DefaultHomeDisplay";
import LoadingState from "@/Components/Loading/LoadingState";
import PostCreationDrawer from "@/Components/feed/PostCreationDrawer";
import PostItem from "@/Components/feed/PostItem";
import UserAvatar from "@/Components/common/avatars/UserAvatar";
import PostItemCarousel from "@/Components/feed/PostItemCarousel";
import AuthenticatedLayout from "@/layout/AuthenticatedLayout";
import FeedLayout from "@/layout/FeedLayout";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import CreatePost from "@/Components/feed/CreatePost";

function Home() {
  const [currentClubFeed, setCurrentClubFeed] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const page = usePage();
  const groupId = page.props.groupId;
  const [postData, setPostData] = useState(null);
  const postUser = page.props.auth.user;

  const handlePostData = (data) => {
    setPostData(data);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      if (!groupId) return setCurrentClubFeed([]);

      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/post/group/${groupId}/posts`
        );

        setCurrentClubFeed(data);
        setPosts(data.posts);
        setError(null);
      } catch (err) {
        setError(
          err.response ? err.response.data.message : "An error occurred"
        );
        setPosts([]);
        setCurrentClubFeed(err.response.data);
        console.log(err.response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [groupId]);

  const renderContent = () => {
    if (!groupId) {
      return <DefaultHomeDisplay />;
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
            <PostCreationDrawer
              feed={currentClubFeed.selectedClub}
              onPostData={handlePostData}
            />
          </div>
        </div>
      );
    }

    if (posts.length === 0) {
      return (
        <div className="flex flex-col gap-8 justify-center items-center text-center h-full opacity-50">
          <div className="text-2xl md:text-4xl p-16 text-slate-800">
            No posts available
          </div>
          <NewspaperIcon className="w-32 h-32 inline-block" />
        </div>
      );
    }

    return (
      <div className="flex flex-col w-full h-full relative">
        <div className="fixed right-4 sm:right-8 sm:bottom-8 bottom-4">
          <PostCreationDrawer
            feed={currentClubFeed.selectedClub}
            onPostData={handlePostData}
          />
        </div>
        <div className="w-full sm:p-4 p-2 pb-0 border-b border-slate-200">
          <CreatePost
            postUser={postUser}
            feed={currentClubFeed.selectedClub}
            onPostData={handlePostData}
          />
        </div>
        {postData && (
          <PostItem
            key={postData.data.id}
            username={postData.data.user.name}
            content={postData.data.content}
            createdAt={postData.data.created_at}
            postUserId={postData.data.user_id}
            likes={0}
            isAdmin={postData.data.user.is_admin}
            avatar={<UserAvatar user={postData.data.user} />}
            carousel={
              postData.data.attachments.length > 0 &&
              postData.data.attachments.some((att) =>
                att.mime.startsWith("image/")
              ) ? (
                <PostItemCarousel
                  images={postData.data.attachments
                    .filter((att) => att.mime.startsWith("image/"))
                    .map((att) => att.url)}
                />
              ) : null
            }
          />
        )}
        {posts.map((post) => (
          <PostItem
            key={post.id}
            username={post.user.name}
            content={post.content}
            createdAt={post.created_at}
            likes={post.likes || 0}
            isAdmin={post.user.is_admin}
            postUserId={post.user_id}
            avatar={<UserAvatar user={post.user} />}
            carousel={
              post.attachments.length > 0 &&
              post.attachments.some((att) => att.mime.startsWith("image/")) ? (
                <PostItemCarousel
                  images={post.attachments
                    .filter((att) => att.mime.startsWith("image/"))
                    .map((att) => att.url)}
                />
              ) : null
            }
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex justify-between">
      <div className="w-full min-h-screen h-full bg-white shadow-lg rounded-xl  flex flex-col overflow-hidden lg:mx-12">
        <div className="flex justify-center items-center h-full flex-col">
          {renderContent()}
        </div>
      </div>

      <div className="hidden sm:flex sm:w-[30px] lg:w-[300px]"></div>
    </div>
  );
}

Home.layout = (page) => (
  <AuthenticatedLayout user={page.props.auth.user}>
    <FeedLayout>{page}</FeedLayout>
  </AuthenticatedLayout>
);

export default Home;

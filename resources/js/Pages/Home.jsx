import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FeedLayout from "@/Layouts/FeedLayout";
import { NewspaperIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePage } from "@inertiajs/react";
import LoadingState from "@/Components/App/LoadingState";
import DefaultHomeDisplay from "@/Components/App/DefaultHomeDisplay";
import PostCreationDrawer from "@/Components/App/PostCreationDrawer";
import PostItem from "@/Components/App/PostItem";
import UserAvatar from "@/Components/App/UserAvatar";
import PostItemCarousel from "../Components/App/PostItemCarousel";

function Home() {
  const [currentClubFeed, setCurrentClubFeed] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const page = usePage();
  const groupId = page.props.groupId;
  const [postData, setPostData] = useState(null);

  const handlePostData = (data) => {
    console.log("Received data from child:", data);
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
      return <LoadingState />;
    }

    if (error) {
      return (
        <div className="text-red-600 text-xl">
          {error}
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
          <div className="text-2xl md:text-4xl p-16 text-gray-800">
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
        {postData && (
          <PostItem
            key={postData.data.id}
            username={postData.data.user.name}
            content={postData.data.content}
            createdAt={postData.data.created_at}
            likes={postData.data.likes || 23}
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
            likes={post.likes || 23}
            isAdmin={post.user.is_admin}
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

      <div className="hidden sm:flex sm:w-[200px] lg:w-[300px]"></div>
    </div>
  );
}

Home.layout = (page) => (
  <AuthenticatedLayout user={page.props.auth.user}>
    <FeedLayout>{page}</FeedLayout>
  </AuthenticatedLayout>
);

export default Home;

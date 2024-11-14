import ChatDisplayGuide from "./ChatDisplayGuide";

const DefaultChatDisplay = () => {
  return (
    <div className="bg-red w-full h-full flex gap-2 p-4 flex-col place-items-center sm:place-items-start justify-center">
      <div>
        <ChatDisplayGuide />
      </div>
    </div>
  );
};
export default DefaultChatDisplay;

function Logo() {
  return (
    <div className="flex flex-col place-items-center justify-center w-screen h-screen bg-green-400">
      <div className=" relative h-40 w-40 bg-primary overflow-hidden rounded-sm">
        <div className="triangle-left right-20 -top-6 "></div>
        <div className="triangle-right left-14 -top-6"></div>
      </div>
    </div>
  );
}
export default Logo;

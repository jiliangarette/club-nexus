const LoadingState = () => {
  return (
    <div className="flex flex-col place-items-center justify-center gap-6">
      <script src="https://cdn.lordicon.com/lordicon.js"></script>
      <lord-icon
        src="https://cdn.lordicon.com/sbrtyqxj.json"
        trigger="loop"
        state="bolt"
        colors="primary:#1B1B1B"
        style={{ width: "100px", height: "100px" }}
      ></lord-icon>
      <div className="loader"></div>
    </div>
  );
};
export default LoadingState;

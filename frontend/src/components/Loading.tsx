import Col from "./chunks/Col";

function Loading() {
  return (
    <Col className=" h-screen w-screen bg-primary fixed top-0">
      <Col className="loader absolute mx-auto m-auto top-0 h-screen w-screen text-7xl">😎</Col>
    </Col>
  );
}
export default Loading;

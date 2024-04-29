import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Test from "./Draft/Test";

const Pages = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <NotFound />,
    },
    {
      path: "/test",
      element: <Test />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Pages;

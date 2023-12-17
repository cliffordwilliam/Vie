import { createBrowserRouter, redirect, useNavigate } from "react-router-dom";
// pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
// layout
import PrivateLayout from "./layouts/PrivateLayout";
import PublicLayout from "./layouts/PublicLayout";
import GlobalLayout from "./layouts/GlobalLayout";

const router = createBrowserRouter([
  {
    element: <GlobalLayout />,
    children: [
      {
        element: <PrivateLayout />,
        loader: () => {
          if (!localStorage.token) {
            return redirect("/register");
          }
          return null;
        },
        children: [
          {
            path: "/",
            element: <Home />,
          },
        ],
      },
      {
        element: <PublicLayout />,
        children: [
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/login",
            element: <Login />,
          },
        ],
      },
    ],
  },
]);

export default router;

import PublicLayout from "../components/layout/PublicLayout.jsx";
import Home from "../pages/public/Home.jsx";
import Login from "../pages/public/Login.jsx";
import Signup from "../pages/public/Signup.jsx";

const publicRoutes = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
];

export default publicRoutes;

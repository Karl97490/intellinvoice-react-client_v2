import PrivateLayout from "../components/layout/PrivateLayout.jsx";
import Dashboard from "../pages/private/Dashboard.jsx";
import OnlyPrivate from "../components/auth/OnlyPrivate.jsx";

const privateRoutes = [
  {
    element: <OnlyPrivate />,
    children: [
      {
        element: <PrivateLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
];

export default privateRoutes;

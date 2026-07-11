import PrivateLayout from "../components/layout/PrivateLayout.jsx";
import Dashboard from "../pages/private/Dashboard.jsx";
import OnlyPrivate from "../components/auth/OnlyPrivate.jsx";
import CreateClient from "../pages/private/Clients/CreateClient.jsx";

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
          {
            path: "/clients/new",
            element: <CreateClient />,
          },
        ],
      },
    ],
  },
];

export default privateRoutes;

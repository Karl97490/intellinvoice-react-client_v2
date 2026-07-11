import PrivateLayout from "../components/layout/PrivateLayout.jsx";
import Dashboard from "../pages/private/Dashboard.jsx";
import OnlyPrivate from "../components/auth/OnlyPrivate.jsx";
import CreateClient from "../pages/private/Clients/CreateClient.jsx";
import AllClients from "../pages/private/Clients/AllClients.jsx";

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
          {
            path: "/clients",
            element: <AllClients />,
          },
        ],
      },
    ],
  },
];

export default privateRoutes;

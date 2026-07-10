import PrivateLayout from "../components/layout/PrivateLayout.jsx";
import Dashboard from "../pages/private/Dashboard.jsx";

const privateRoutes = [
  {
    element: <PrivateLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
];

export default privateRoutes;

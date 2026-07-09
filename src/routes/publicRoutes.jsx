import PublicLayout from "../components/layout/PublicLayout";
import App from "../App";

const publicRoutes = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
    ],
  },
];

export default publicRoutes;

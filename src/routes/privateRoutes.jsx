import PrivateLayout from "../components/layout/PrivateLayout.jsx";
import Dashboard from "../pages/private/Dashboard.jsx";
import OnlyPrivate from "../components/auth/OnlyPrivate.jsx";
import AllClients from "../pages/private/Clients/AllClients.jsx";
import CreateClient from "../pages/private/Clients/CreateClient.jsx";
import CreateInvoice from "../pages/private/Invoices/CreateInvoice.jsx";
import InvoiceDetails from "../pages/private/Invoices/InvoiceDetails.jsx";

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
            path: "/invoices/new",
            element: <CreateInvoice />,
          },
          {
            path: "/invoices/details/:invoiceId",
            element: <InvoiceDetails />,
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

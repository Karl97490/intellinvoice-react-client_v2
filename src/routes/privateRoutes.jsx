import PrivateLayout from "../components/layout/PrivateLayout.jsx";
import Dashboard from "../pages/private/Dashboard.jsx";
import OnlyPrivate from "../components/auth/OnlyPrivate.jsx";
import AllClients from "../pages/private/Clients/AllClients.jsx";
import CreateInvoice from "../pages/private/Invoices/CreateInvoice.jsx";
import InvoiceDetails from "../pages/private/Invoices/InvoiceDetails.jsx";
import EditInvoice from "../pages/private/Invoices/EditInvoice.jsx";
import ALlInvoices from "../pages/private/Invoices/AllInvoices.jsx";
import Profile from "../pages/private/User/Profile.jsx";

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
            path: "/invoices",
            element: <ALlInvoices />,
          },
          {
            path: "/invoices/new",
            element: <CreateInvoice />,
          },
          {
            path: "/invoices/edit/:invoiceId",
            element: <EditInvoice />,
          },
          {
            path: "/invoices/details/:invoiceId",
            element: <InvoiceDetails />,
          },
          {
            path: "/clients",
            element: <AllClients />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
];

export default privateRoutes;

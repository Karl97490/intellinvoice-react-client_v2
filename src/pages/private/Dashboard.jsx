import { useEffect, useState } from "react";
import invoiceService from "../../services/invoice.service";
import { Spinner } from "flowbite-react";

const Dashboard = () => {
  const [invoices, setInvoices] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await invoiceService.getAllInvoices({ limit: 5 });
      console.log(response);
      setIsLoading(false);
      setInvoices(response.data);
    } catch (error) {
      console.log(error.response);
      // navigate("error-page"); // Redirect to error page
    }
  };

  if (isLoading) {
    return (
      <>
        <div className="mx-auto flex flex-col gap-2 items-center">
          <Spinner aria-label="Loading spinner" size="xl" />
          <span className="text-md">Loading...</span>
        </div>
      </>
    );
  }
  return <h1>Dashboard component</h1>;
};

export default Dashboard;

import { useEffect, useState } from "react";
import invoiceService from "../../../services/invoice.service";
import { Spinner } from "flowbite-react";

const ALlInvoices = () => {
  const [invoices, setInvoices] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await invoiceService.getAllInvoices();
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
      // navigate("error-page") // Redirecto to error page
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 items-center mx-auto">
        <Spinner aria-label="Loading spinner" size="xl" />
        <span className="text-md">Loading...</span>
      </div>
    );
  }
  return <h1>AllInvoices component</h1>;
};

export default ALlInvoices;

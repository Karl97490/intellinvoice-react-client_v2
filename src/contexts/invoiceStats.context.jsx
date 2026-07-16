import { createContext, useEffect, useState } from "react";
import invoiceService from "../services/invoice.service";
import { Spinner } from "flowbite-react";

const InvoiceStatsContext = createContext();

const InvoiceStatsProviderWrapper = (props) => {
  const [invoiceStats, setInvoiceStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await invoiceService.getInvoiceStats();
      console.log(response.data);
      setIsLoading(false);
      setInvoiceStats(response.data);
    } catch (error) {
      console.log(error.response);
      setIsLoading(false);
      setInvoiceStats(null);
      throw error;
    }
  };

  const statsContext = {
    invoiceStats,
    getData,
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 items-center mx-auto">
        <Spinner aria-label="Loading spinner" size="xl" />
        <span className="text-md">Loading...</span>
      </div>
    );
  }

  return (
    <InvoiceStatsContext.Provider value={statsContext}>
      {props.children}
    </InvoiceStatsContext.Provider>
  );
};

export { InvoiceStatsContext, InvoiceStatsProviderWrapper };

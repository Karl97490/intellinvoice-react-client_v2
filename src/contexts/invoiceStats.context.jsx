import { createContext, useContext, useEffect, useState } from "react";
import invoiceService from "../services/invoice.service";
import { Spinner } from "flowbite-react";
import { AuthContext } from "./auth.context";

const InvoiceStatsContext = createContext();

const InvoiceStatsProviderWrapper = (props) => {
  const [invoiceStats, setInvoiceStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    getData();
  }, [user]);

  const getData = async () => {
    try {
      const response = await invoiceService.getInvoiceStats();
      console.log(response.data);
      setInvoiceStats(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
      setInvoiceStats(null);
      setIsLoading(false);
      throw error;
    }
  };

  const statsContext = {
    invoiceStats,
    getData,
  };

  return (
    <InvoiceStatsContext.Provider value={statsContext}>
      {props.children}
    </InvoiceStatsContext.Provider>
  );
};

export { InvoiceStatsContext, InvoiceStatsProviderWrapper };

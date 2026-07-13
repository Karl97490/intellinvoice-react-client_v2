import { useEffect, useState } from "react";
import invoiceService from "../../../services/invoice.service";
import { useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";

const InvoiceDetails = () => {
  const { invoiceId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await invoiceService.getInvoice(invoiceId);
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
      // navigate("/error-page") // Implement error page
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

  return <h1>InvoiceDetails component</h1>;
};

export default InvoiceDetails;

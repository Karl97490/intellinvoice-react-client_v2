import { useEffect, useState } from "react";
import invoiceService from "../../../services/invoice.service";
import { useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";

const EditInvoice = () => {
  const { invoiceId } = useParams();
  const [updateInvoiceForm, setUpdateInvoiceForm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await invoiceService.getInvoice(invoiceId);
      console.log(response);
      setIsLoading(false);
      setUpdateInvoiceForm(response.data);
    } catch (error) {
      console.log(error.response);
      // navigate("/error-page") // Redirect to error page
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

  return <h1>EditInvoice component</h1>;
};

export default EditInvoice;

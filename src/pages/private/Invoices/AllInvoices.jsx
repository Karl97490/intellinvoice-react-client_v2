import { useEffect, useState } from "react";
import invoiceService from "../../../services/invoice.service";
import { Spinner, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import delay from "../../../utils/delay";

const ALlInvoices = () => {
  const [invoices, setInvoices] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await invoiceService.getAllInvoices();
      console.log(response);
      setIsLoading(false);
      setInvoices(response.data);
    } catch (error) {
      console.log(error.response);
      // navigate("error-page") // Redirecto to error page
    }
  };

  const handleDeleteInvoice = async (invoiceId) => {
    console.log("Deleting invoice with id: " + invoiceId);
    setIsDeleting(true);
    try {
      const response = await invoiceService.deleteInvoice(invoiceId);
      console.log(response);
      setIsDeleting(false);
      getData();
    } catch (error) {
      console.log(error.response);
      setIsDeleting(false);
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
  return (
    <>
      <h1>AllInvoices component</h1>
      {invoices.map((invoice) => {
        return (
          <div key={invoice._id} className="flex gap-x-2 items-center">
            <span>{invoice.client.name}</span>
            <span>{invoice.invoiceNumber}</span>
            <span>${invoice.total.toFixed(1)}</span>
            <span>{invoice.status}</span>
            <span>{new Date(invoice.issuedDate).toDateString()}</span>
            <span>{new Date(invoice.dueDate).toDateString()}</span>
            <Button
              color="alternative"
              className="cursor-pointer"
              as={Link}
              to={`/invoices/details/${invoice._id}`}
            >
              Show
            </Button>
            <Button
              className="cursor-pointer"
              as={Link}
              to={`/invoices/edit/${invoice._id}`}
            >
              Edit
            </Button>
            <Button
              color="red"
              className="cursor-pointer"
              onClick={() => handleDeleteInvoice(invoice._id)}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Spinner aria-label="Deleting loading spinner" size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                <>Delete</>
              )}
            </Button>
          </div>
        );
      })}
    </>
  );
};

export default ALlInvoices;

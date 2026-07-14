import { useEffect, useState } from "react";
import invoiceService from "../../../services/invoice.service";
import { Spinner, Button } from "flowbite-react";

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
      setInvoices(response.data);
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
              onClick={undefined}
            >
              Show
            </Button>
            <Button className="cursor-pointer" onClick={undefined}>
              Edit
            </Button>
            <Button color="red" className="cursor-pointer" onClick={undefined}>
              Delete
            </Button>
          </div>
        );
      })}
    </>
  );
};

export default ALlInvoices;

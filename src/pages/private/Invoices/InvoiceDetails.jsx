import { useEffect, useState } from "react";
import invoiceService from "../../../services/invoice.service";
import { Link, useParams } from "react-router-dom";
import { Spinner, Button, Card } from "flowbite-react";

const InvoiceDetails = () => {
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await invoiceService.getInvoice(invoiceId);
      setIsLoading(false);
      setInvoice({
        ...response.data,
        issuedDate: new Date(response.data.issuedDate),
        dueDate: new Date(response.data.dueDate),
      });
    } catch (error) {
      // navigate("/error-page") // Redirect to error page
    }
  };

  if (isLoading) {
    return (
      <>
        <div className="flex flex-col gap-2 items-center mx-auto">
          <Spinner aria-label="Loading spinner" size="xl" />
          <span className="text-md">Loading...</span>
        </div>
      </>
    );
  }

  return (
    <>
      <section>
        <Card className="mb-4">
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-y-1">
              <h2 className="dark:text-white">Invoice Details</h2>
              <p className="dark:text-white">
                You can see the details and print or download the invoice.
              </p>
            </div>
            <div className="flex gap-x-2">
              <Button color="alternative" className="cursor-pointer">
                Cancel
              </Button>
              <Button className="cursor-pointer">Print or Download</Button>
            </div>
          </div>
        </Card>
        <div className="p-4 border border-gray-500 border-dashed rounded">
          <Card>
            <p>Invoice Number : {invoice.invoiceNumber}</p>
            <p>Status : {invoice.status}</p>
            <p>Issued Date : {invoice.issuedDate.toDateString()}</p>
            <p>Due Date : {invoice.dueDate.toDateString()}</p>
            <h2>Owner Infos</h2>
            <p>Name : {invoice.owner.name}</p>
            <p>Email : {invoice.owner.email}</p>
            <p>Address : {invoice.owner.address}</p>
            <p>Phone : {invoice.owner.phone}</p>
            <h2>Client Infos</h2>
            <p>Name : {invoice.client.name}</p>
            <p>Email : {invoice.client.email}</p>
            <p>Address : {invoice.client.address}</p>
            <p>Phone : {invoice.client.phone}</p>
            <h2>Items</h2>
            {invoice.items.map((item, index) => {
              return (
                <div key={index} className="flex gap-x-2">
                  <p>Title : {item.title}</p>
                  <p>Quantity : {item.quantity}</p>
                  <p>Tax Rate : {item.taxRate}%</p>
                  <p>Unit Price : ${item.unitPrice}</p>
                </div>
              );
            })}
            <h2>Notes</h2>
            <p>{invoice.notes}</p>
            <h2>Totals</h2>
            <p>Tax Rate : {invoice.taxRate.toFixed(1)}%</p>
            <p>Tax Amount : ${invoice.taxAmount.toFixed(1)}</p>
            <p>Sub Total : ${invoice.subTotal.toFixed(1)}</p>
            <p>Total : ${invoice.total.toFixed(1)}</p>
          </Card>
        </div>
      </section>
    </>
  );
};

export default InvoiceDetails;

import { useEffect, useState } from "react";
import invoiceService from "../../../services/invoice.service";
import { Link, useParams } from "react-router-dom";
import { Spinner, Button } from "flowbite-react";

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
      console.log(response);
      setIsLoading(false);
      setInvoice(response.data);
    } catch (error) {
      console.log(error.response);
      // navigate("/error-page") // Redirect to error page
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

  return (
    <>
      <h1>InvoiceDetails component</h1>
      <div className="flex gap-x-2">
        <Button
          color="alternative"
          className="cursor-pointer"
          as={Link}
          to={`/invoices/edit/${invoice._id}`}
        >
          Edit invoice
        </Button>
        <Button className="cursor-pointer">Print or Download</Button>
      </div>
      <p>Invoice Number : {invoice.invoiceNumber}</p>
      <p>Status : {invoice.status}</p>
      <p>Issued Date : {new Date(invoice.issuedDate).toDateString()}</p>
      <p>Due Date : {new Date(invoice.dueDate).toDateString()}</p>
      <h2>Owner Infos</h2>
      <p>Name : {invoice.owner.name}</p>
      <p>Email : {invoice.owner.email}</p>
      <p>Address : {invoice.owner.address}</p>
      <p>Phone : {invoice.owner.Phone}</p>
      <h2>Client Infos</h2>
      <p>Name : {invoice.client.name}</p>
      <p>Email : {invoice.client.email}</p>
      <p>Address : {invoice.client.address}</p>
      <p>Phone : {invoice.client.Phone}</p>
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
      <p>Tax Rate : {invoice.taxRate}%</p>
      <p>Tax Amount : ${invoice.taxAmount}</p>
      <p>Sub Total : ${invoice.subTotal}</p>
      <p>Total : ${invoice.total}</p>
    </>
  );
};

export default InvoiceDetails;

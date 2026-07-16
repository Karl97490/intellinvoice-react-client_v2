import { useContext, useEffect, useState } from "react";
import invoiceService from "../../services/invoice.service";
import { Button, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { InvoiceStatsContext } from "../../contexts/invoiceStats.context";

const Dashboard = () => {
  const [invoices, setInvoices] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { invoiceStats } = useContext(InvoiceStatsContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await invoiceService.getAllInvoices({
        limit: 5,
        sort: { createdAt: -1 },
      });
      setIsLoading(false);
      setInvoices(response.data);
    } catch (error) {
      // navigate("error-page"); // Redirect to error page
    }
  };

  if (isLoading || !invoiceStats) {
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
      <h1>Dashboard component</h1>
      <h2>Invoice Stats</h2>
      <div className="flex gap-x-2">
        <span>Total Paid : {invoiceStats.totalPaid}</span>
        <span>Total Unpaid : {invoiceStats.totalUnpaid}</span>
        <span>Total Amount : ${invoiceStats.totalAmount}</span>
      </div>
      <h2>Recent Invoices</h2>
      {invoices.map((invoice) => {
        return (
          <div key={invoice._id}>
            <div className="flex gap-x-2 items-center">
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
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Dashboard;

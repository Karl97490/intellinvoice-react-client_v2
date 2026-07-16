import { useEffect, useRef, useState } from "react";
import invoiceService from "../../../services/invoice.service";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Spinner,
  Button,
  Card,
  Badge,
  Table,
  TabItem,
  TableBody,
  TableHead,
  TableCell,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useReactToPrint } from "react-to-print";

const InvoiceDetails = () => {
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const componentRef = useRef();

  const badgeColor = {
    unpaid: "failure",
    pending: "indigo",
    paid: "success",
    overdue: "warning",
  };

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

  const handlePrintOrDownload = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `invoice-${invoice?.invoiceNumber}`,
    pageStyle: `
    @media print {
      body { margin: 0; }
      div { page-break-inside: avoid; }
    }`,
  });

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
              <Button
                color="alternative"
                className="cursor-pointer"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
              <Button
                className="cursor-pointer"
                onClick={handlePrintOrDownload}
              >
                Print or Download
              </Button>
            </div>
          </div>
        </Card>
        <Card>
          <div
            className="rounded-xl bg-white p-10 shadow-xl print:shadow-none"
            ref={componentRef}
          >
            <div className="mb-10 flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold text-blue-600">
                  IntellInvoice
                </h1>

                <p className="mt-2 text-gray-500">Smart Invoice Management</p>
              </div>

              <div className="text-right">
                <h2 className="text-2xl font-bold text-gray-900">
                  Invoice #{invoice.invoiceNumber}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Issued: {new Date(invoice.issuedDate).toDateString()}
                </p>

                <p className="text-sm text-gray-500">
                  Due: {new Date(invoice.dueDate).toDateString()}
                </p>
              </div>
            </div>

            <div className="mb-10 grid grid-cols-2 gap-12">
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                  From
                </h3>

                <div className="space-y-1">
                  <p className="font-semibold text-gray-900">
                    {invoice.owner.name}
                  </p>

                  <p>{invoice.owner.email}</p>

                  <p>{invoice.owner.address}</p>

                  <p>{invoice.owner.phone}</p>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Bill To
                </h3>

                <div className="space-y-1">
                  <p className="font-semibold text-gray-900">
                    {invoice.client.name}
                  </p>

                  <p>{invoice.client.email}</p>

                  <p>{invoice.client.address}</p>

                  <p>{invoice.client.phone}</p>
                </div>
              </div>
            </div>

            <Table hoverable>
              <TableHead>
                <TableHeadCell>Description</TableHeadCell>

                <TableHeadCell>Quantity</TableHeadCell>

                <TableHeadCell>Unit Price</TableHeadCell>

                <TableHeadCell>Tax</TableHeadCell>

                <TableHeadCell className="text-right">Total</TableHeadCell>
              </TableHead>

              <TableBody className="divide-y">
                {invoice.items.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{item.title}</TableCell>

                      <TableCell>{item.quantity}</TableCell>

                      <TableCell>${item.unitPrice}</TableCell>

                      <TableCell>{item.taxRate}%</TableCell>

                      <TableCell className="text-right font-medium">
                        ${item.quantity * item.unitPrice}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {/* Totals */}

            <div className="mt-10 flex justify-end">
              <div className="w-80">
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Subtotal</span>

                  <span className="font-medium">
                    ${invoice.subTotal.toFixed(1)}
                  </span>
                </div>

                <div className="flex justify-between py-2">
                  <span className="text-gray-500">
                    Tax ({invoice.taxRate}%)
                  </span>

                  <span className="font-medium">
                    ${invoice.taxAmount.toFixed(1)}
                  </span>
                </div>

                <div className="mt-3 border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>

                    <span className="text-3xl font-bold text-blue-600">
                      ${invoice.total.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}

            <div className="mt-12 border-t pt-8">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                Notes
              </h3>

              <p className="leading-7 text-gray-600">{invoice.notes}</p>
            </div>
          </div>
        </Card>
      </section>

      {/* <section>
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
      </section> */}
    </>
  );
};

export default InvoiceDetails;

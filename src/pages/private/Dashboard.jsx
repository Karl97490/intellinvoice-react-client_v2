import { useContext, useEffect, useState } from "react";
import invoiceService from "../../services/invoice.service";
import {
  Button,
  Spinner,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { InvoiceStatsContext } from "../../contexts/invoiceStats.context";
import { CircleCheck } from "lucide-react";

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
      <section>
        <Card className="mb-4">
          <div className="flex flex-col gap-y-1">
            <h2 className="dark:text-white">Dashboard</h2>
            <p className="dark:text-white">Welcome User !</p>
          </div>
        </Card>
        <div class="p-4 border border-gray-500 border-dashed rounded">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <Card>
              <div className="flex justify-center items-center">
                <div className="inline-flex h-15 w-15 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"></div>
                <div className="flex-1 text-center dark:text-white">
                  <h3>Total Paid</h3>
                  <span>$1200</span>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex justify-center items-center">
                <div className="inline-flex h-15 w-15 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"></div>
                <div className="flex-1 text-center dark:text-white">
                  <h3>Total Unpaid</h3>
                  <span>$1200</span>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex justify-center items-center">
                <div className="inline-flex h-15 w-15 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200"></div>
                <div className="flex-1 text-center dark:text-white">
                  <h3>Total Amount</h3>
                  <span>$1200</span>
                </div>
              </div>
            </Card>
          </div>
          <Card className="mb-4">
            <div className="dark:text-white">
              <h3 className="mb-2">Quick overview</h3>
              <ul class="max-w-md space-y-1 text-body list-inside">
                <li class="flex gap-x-2 items-center">
                  <CircleCheck size={16} />
                  At least 10 characters
                </li>
                <li class="flex gap-x-2 items-center">
                  <CircleCheck size={16} />
                  At least 10 characters
                </li>
                <li class="flex gap-x-2 items-center">
                  <CircleCheck size={16} />
                  At least 10 characters
                </li>
              </ul>
            </div>
          </Card>
          <Card className="overflow-x-auto">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell>Client</TableHeadCell>
                  <TableHeadCell>Invoice Number</TableHeadCell>
                  <TableHeadCell>Amount</TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                  <TableHeadCell>Issued Date</TableHeadCell>
                  {/* <TableHeadCell>Due Date</TableHeadCell> */}
                  <TableHeadCell>
                    <span className="sr-only">View</span>
                  </TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody className="divide-y">
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    Alex Doe
                  </TableCell>
                  <TableCell>#INV-001</TableCell>
                  <TableCell>$1500</TableCell>
                  <TableCell>Pending</TableCell>
                  <TableCell>05/12/2026</TableCell>
                  <TableCell>
                    <Link
                      to=""
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
          {/* <div class="flex items-center justify-center h-48 rounded-base bg-red-100 mb-4"></div>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex items-center justify-center h-24 rounded-base bg-red-100"></div>
            <div class="flex items-center justify-center h-24 rounded-base bg-red-100"></div>
            <div class="flex items-center justify-center h-24 rounded-base bg-red-100"></div>
            <div class="flex items-center justify-center h-24 rounded-base bg-red-100"></div>
          </div> */}
        </div>
      </section>
      {/* <h1>Dashboard component</h1>
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
      })} */}
    </>
  );
};

export default Dashboard;

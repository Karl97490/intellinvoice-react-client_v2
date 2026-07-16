import { use, useContext, useEffect, useState } from "react";
import invoiceService from "../../../services/invoice.service";
import {
  Spinner,
  Button,
  Label,
  TextInput,
  Datepicker,
  Dropdown,
  DropdownItem,
  DropdownDivider,
  Checkbox,
  Select,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { Check, Eye, Ellipsis } from "lucide-react";
import { Link } from "react-router-dom";
import delay from "../../../utils/delay";
import useDebounce from "../../../hooks/useDebounce";
import ConfirmationModal from "../../../components/ui/ConfirmationModal";
import NotificationToast from "../../../components/ui/NotificationToast";
import { InvoiceStatsContext } from "../../../contexts/invoiceStats.context";

const ALlInvoices = () => {
  const [invoices, setInvoices] = useState(null);
  const { invoiceStats, getData: getInvoiceStats } =
    useContext(InvoiceStatsContext);

  const [searchQuery, setSearchQuery] = useState("");
  const searchQueryDebounced = useDebounce(searchQuery);
  const [issuedDateQuery, setIssuedDateQuery] = useState(undefined);
  const [dueDateQuery, setDueDateQuery] = useState(undefined);
  const [statusQuery, setStatusQuery] = useState([]);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [pendingStatus, setPendingStatus] = useState(null);

  const [successDeleteToast, setSuccessDeleteToast] = useState(false);
  const [successUpdateToast, setSuccessUpdateToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, [searchQueryDebounced, issuedDateQuery, dueDateQuery, statusQuery]);

  const getData = async () => {
    try {
      const response = await invoiceService.getAllInvoices({
        search: searchQueryDebounced,
        issuedDate: issuedDateQuery
          ? new Date(issuedDateQuery.setHours(0, 0, 0, 0))
          : undefined,
        dueDate: dueDateQuery
          ? new Date(dueDateQuery.setHours(0, 0, 0, 0))
          : undefined,
        status: statusQuery,
      });
      setIsLoading(false);
      setInvoices(response.data);
    } catch (error) {
      // navigate("error-page") // Redirecto to error page
    }
  };

  const handleFilterStatus = (e) => {
    const { value, checked } = e.target;
    setStatusQuery((prev) =>
      checked ? [...prev, value] : prev.filter((status) => status !== value),
    );
  };

  const handleUpdateModal = (invoice, value) => {
    setSelectedInvoice(invoice);
    setPendingStatus(value);
    setOpenUpdateModal(true);
  };

  const handleUpdateStatus = async () => {
    setIsUpdating(true);

    const body = { status: pendingStatus };
    try {
      const response = await invoiceService.updateStatusInvoice(
        selectedInvoice._id,
        body,
      );
      await getData();
      setIsUpdating(false);
      setOpenUpdateModal(false);
      setSelectedInvoice(null);
      setPendingStatus(null);
      setSuccessUpdateToast(true);
      await delay(2000);
      setSuccessUpdateToast(false);
    } catch (error) {
      setIsUpdating(false);
      setErrorToast(true);
      await delay(2000);
      setErrorToast(false);
    }
  };

  const handleDeleteModal = (invoice) => {
    setSelectedInvoice(invoice);
    setOpenDeleteModal(true);
  };

  const handleDeleteInvoice = async () => {
    setIsDeleting(true);
    try {
      const response = await invoiceService.deleteInvoice(selectedInvoice._id);
      await getData();
      await getInvoiceStats();
      setIsDeleting(false);
      setOpenDeleteModal(false);
      setSelectedInvoice(null);
      setSuccessDeleteToast(true);
      await delay(2000);
      setSuccessDeleteToast(false);
    } catch (error) {
      setIsDeleting(false);
      setOpenDeleteModal(false);
      setSelectedInvoice(null);
      setErrorToast(true);
      await delay(2000);
      setErrorToast(false); // Find a way to display toast when modal opened
    }
  };

  if (isLoading || !invoiceStats) {
    return (
      <div className="flex flex-col gap-2 items-center mx-auto">
        <Spinner aria-label="Loading spinner" size="xl" />
        <span className="text-md">Loading...</span>
      </div>
    );
  }
  return (
    <>
      {successUpdateToast && (
        <NotificationToast
          status="success"
          message="Update status successfully"
        />
      )}
      {successDeleteToast && (
        <NotificationToast
          status="success"
          message="Delete invoice successfully"
        />
      )}
      {errorToast && (
        <NotificationToast
          status="error"
          message="Something went wrong. Please try again"
        />
      )}
      <section>
        <Card className="mb-4">
          <div className="flex flex-col gap-y-1">
            <h2 className="dark:text-white">All Invoices</h2>
            <p className="dark:text-white">
              You can browse, manage and see all your invoices.
            </p>
          </div>
        </Card>
        <div className="p-4 border border-gray-500 border-dashed rounded">
          <Card>
            <div className="dark:text-white flex gap-x-2">
              <p>
                <strong>Total invoices :</strong> {invoiceStats.totalInvoices}
              </p>
              <p>
                <strong>Total amount :</strong> $ {invoiceStats.totalAmount}
              </p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_repeat(4,auto)] place-items-center gap-x-4">
              <div className="w-full">
                <div className="mb-2 block">
                  <Label htmlFor="search">Search</Label>
                </div>
                <TextInput
                  id="search"
                  placeholder="search"
                  name="search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-full">
                <div className="mb-2 block">
                  <Label htmlFor="issuedDate">Issued Date</Label>
                </div>
                <Datepicker
                  id="issuedDate"
                  value={issuedDateQuery}
                  onChange={(date) => setIssuedDateQuery(date ?? undefined)}
                />
              </div>
              <div className="w-full">
                <div className="mb-2 block">
                  <Label htmlFor="dueDate">Due Date</Label>
                </div>
                <Datepicker
                  id="dueDate"
                  value={dueDateQuery}
                  onChange={(date) => setDueDateQuery(date ?? undefined)}
                />
              </div>
              <div className="w-full">
                <div className="mb-2 block">
                  <Label htmlFor="status">Status</Label>
                </div>
                <Dropdown
                  className="cursor-pointer"
                  label="filter by status"
                  color="alternative"
                  dismissOnClick={false}
                >
                  <DropdownItem>
                    <Checkbox
                      id="pending"
                      value="pending"
                      checked={statusQuery.includes("pending")}
                      onChange={handleFilterStatus}
                    />
                    <Label htmlFor="pending" className="ml-3">
                      Pending
                    </Label>
                  </DropdownItem>
                  <DropdownItem>
                    <Checkbox
                      className="cursor-pointer"
                      id="unpaid"
                      value="unpaid"
                      checked={statusQuery.includes("unpaid")}
                      onChange={handleFilterStatus}
                    />
                    <Label htmlFor="unpaid" className="ml-3">
                      Unpaid
                    </Label>
                  </DropdownItem>
                  <DropdownItem>
                    <Checkbox
                      className="cursor-pointer"
                      id="overdue"
                      value="overdue"
                      checked={statusQuery.includes("overdue")}
                      onChange={handleFilterStatus}
                    />
                    <Label htmlFor="overdue" className="ml-3">
                      Overdue
                    </Label>
                  </DropdownItem>
                  <DropdownItem>
                    <Checkbox
                      className="cursor-pointer"
                      id="paid"
                      value="paid"
                      checked={statusQuery.includes("paid")}
                      onChange={handleFilterStatus}
                    />
                    <Label htmlFor="paid" className="ml-3">
                      Paid
                    </Label>
                  </DropdownItem>
                </Dropdown>
              </div>
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
                  <TableHeadCell>
                    <span className="sr-only">Actions</span>
                  </TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody className="divide-y">
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    Alex Doe
                  </TableCell>
                  <TableCell>#INV-001</TableCell>
                  <TableCell>$ 1200</TableCell>
                  <TableCell className="capitalize">pending</TableCell>
                  <TableCell>21/12/2026</TableCell>
                  <TableCell>
                    <Dropdown
                      inline
                      arrowIcon={false}
                      label={<Ellipsis className="cursor-pointer" size={20} />}
                      className=" dark:text-white"
                      placement="right-start"
                    >
                      <DropdownItem>Show</DropdownItem>
                      <DropdownItem>Edit</DropdownItem>
                      <DropdownDivider />
                      <DropdownItem>Delete</DropdownItem>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </div>
      </section>

      {invoices.map((invoice) => {
        return (
          <div key={invoice._id}>
            <div className="flex gap-x-2 items-center">
              <span>{invoice.client.name}</span>
              <span>{invoice.invoiceNumber}</span>
              <span>${invoice.total.toFixed(1)}</span>
              <Select
                value={invoice.status}
                onChange={(e) => handleUpdateModal(invoice, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="unpaid">Unpaid</option>
                <option value="overdue">Overdue</option>
                <option value="paid">Paid</option>
              </Select>
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
                onClick={() => handleDeleteModal(invoice)}
              >
                Delete
              </Button>
            </div>
          </div>
        );
      })}
      <ConfirmationModal
        show={openDeleteModal}
        status={"delete"}
        title={"Delete invoice"}
        message={"Do you wish to delete this invoice ?"}
        confirmText={"Delete"}
        isLoading={isDeleting}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDeleteInvoice}
      />
      <ConfirmationModal
        show={openUpdateModal}
        status={"update"}
        title={"Update status invoice"}
        message={`Do you wish to change invoice status from ${selectedInvoice?.status} to ${pendingStatus} ?`}
        confirmText={"Confirm"}
        isLoading={isUpdating}
        onClose={() => setOpenUpdateModal(false)}
        onConfirm={handleUpdateStatus}
      />
    </>
  );
};

export default ALlInvoices;

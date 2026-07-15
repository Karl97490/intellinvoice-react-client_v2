import { use, useEffect, useState } from "react";
import invoiceService from "../../../services/invoice.service";
import {
  Spinner,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Toast,
  Label,
  TextInput,
  Datepicker,
  Dropdown,
  DropdownItem,
  Checkbox,
  Select,
} from "flowbite-react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import delay from "../../../utils/delay";
import useDebounce from "../../../hooks/useDebounce";

const ALlInvoices = () => {
  const [invoices, setInvoices] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const searchQueryDebounced = useDebounce(searchQuery);
  const [issuedDateQuery, setIssuedDateQuery] = useState(undefined);
  const [dueDateQuery, setDueDateQuery] = useState(undefined);
  const [statusQuery, setStatusQuery] = useState([]);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [successToast, setSuccessToast] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, [searchQueryDebounced, issuedDateQuery, dueDateQuery, statusQuery]);

  const getData = async () => {
    try {
      // console.log(searchQuery);
      // console.log(issuedDateQuery);
      // console.log(dueDateQuery);
      console.log(statusQuery);
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
      console.log(response);
      setIsLoading(false);
      setInvoices(response.data);
    } catch (error) {
      console.log(error.response);
      // navigate("error-page") // Redirecto to error page
    }
  };

  const handleFilterStatus = (e) => {
    const { value, checked } = e.target;
    setStatusQuery((prev) =>
      checked ? [...prev, value] : prev.filter((status) => status !== value),
    );
  };

  const handleUpdateStatus = async (invoiceId) => {
    console.log("Updating status invoice with id: " + invoiceId);
    // setIsUpdating(true);

    const body = { status: pendingStatus };
    console.log(body);
    try {
      const response = await invoiceService.updateStatusInvoice(
        invoiceId,
        body,
      );
      console.log(response);
      // setIsUpdating(false);
      setOpenUpdateStatusModal(false);
      getData();
    } catch (error) {
      console.log(error.response);
      // setIsUpdating(false);
    }
  };

  const handleDeleteModal = (invoice) => {
    setSelectedInvoice(invoice);
    setOpenDeleteModal(true);
  };

  const handleDeleteInvoice = async () => {
    console.log("Deleting invoice with id: " + selectedInvoice._id);
    setIsDeleting(true);
    try {
      const response = await invoiceService.deleteInvoice(selectedInvoice._id);
      console.log(response);
      setIsDeleting(false);
      setSelectedInvoice(null);
      getData();
      setOpenDeleteModal(false);
      setSuccessToast(true);
      await delay(2000);
      setSuccessToast(false);
    } catch (error) {
      console.log(error.response);
      setIsDeleting(false);
      setSelectedInvoice(null);
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
      {successToast && (
        <Toast className="border border-gray-100">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <Check size={14} />
          </div>
          <div className="ml-3 text-sm font-normal">
            Delete invoice successfully
          </div>
        </Toast>
      )}
      <span>{invoices.length || "0"} invoices</span>
      <div className="flex items-center gap-x-2 my-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="search">Search</Label>
          </div>
          <TextInput
            id="search"
            className="w-100"
            placeholder="search"
            name="search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="issuedDate">Issued Date</Label>
          </div>
          <Datepicker
            id="issuedDate"
            className="w-70"
            value={issuedDateQuery}
            onChange={(date) => setIssuedDateQuery(date ?? undefined)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="dueDate">Due Date</Label>
          </div>
          <Datepicker
            id="dueDate"
            className="w-70"
            value={dueDateQuery}
            onChange={(date) => setDueDateQuery(date ?? undefined)}
          />
        </div>
        <div>
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
      {invoices.map((invoice) => {
        return (
          <div key={invoice._id}>
            <div className="flex gap-x-2 items-center">
              <span>{invoice.client.name}</span>
              <span>{invoice.invoiceNumber}</span>
              <span>${invoice.total.toFixed(1)}</span>
              <Select
                value={invoice.status}
                onChange={(e) => handleSelectStatus(e.target.value)}
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
      <Modal show={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <ModalHeader>Delete invoice</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Do you wish to delete this invoice ?
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Please click on delete if you wish so, or cancel to back to the
              page.
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="cursor-pointer"
            color="alternative"
            onClick={() => setOpenDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="cursor-pointer"
            color="red"
            onClick={handleDeleteInvoice}
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
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ALlInvoices;

import { useEffect, useMemo, useState } from "react";
import invoiceService from "../../../services/invoice.service";
import { useNavigate, useParams } from "react-router-dom";
import {
  Label,
  TextInput,
  Textarea,
  Select,
  Datepicker,
  Button,
  Spinner,
  Toast,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { Check } from "lucide-react";
import validateRequiredFields from "../../../utils/validateRequiredFields";
import delay from "../../../utils/delay";
import calculateInvoiceTotals from "../../../utils/calculateInvoiceTotals";
import NotificationToast from "../../../components/ui/NotificationToast";

const EditInvoice = () => {
  const { invoiceId } = useParams();
  const [updateInvoiceForm, setUpdateInvoiceForm] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const totals = useMemo(() => {
    if (updateInvoiceForm) {
      return calculateInvoiceTotals(
        updateInvoiceForm.items,
        updateInvoiceForm.taxRate,
      );
    }
  }, [updateInvoiceForm?.items, updateInvoiceForm?.taxRate]);

  const getData = async () => {
    try {
      const response = await invoiceService.getInvoice(invoiceId);
      setIsLoading(false);
      setUpdateInvoiceForm({
        ...response.data,
        issuedDate: new Date(response.data.issuedDate),
        dueDate: new Date(response.data.dueDate),
      });
    } catch (error) {
      // navigate("/error-page") // Redirect to error page
    }
  };

  const handleChange = (e, itemIndex, date, dateField) => {
    if (date && dateField) {
      setUpdateInvoiceForm((prev) => ({
        ...prev,
        [dateField]: date,
      }));
      return;
    }

    const { name, value } = e.target;
    const section = e.target.dataset.section;

    if (name === "taxRate") {
      setUpdateInvoiceForm((prev) => ({
        ...prev,
        [name]: value,
        items: prev.items.map((item) => ({
          ...item,
          [name]: value,
        })),
      }));
      return;
    }

    if (section && (section === "client" || section === "owner")) {
      setUpdateInvoiceForm((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value,
        },
      }));
      return;
    }

    if (section && section === "items") {
      setUpdateInvoiceForm((prev) => ({
        ...prev,
        items: prev.items.map((item, index) =>
          index === itemIndex
            ? {
                ...item,
                [name]: value,
              }
            : item,
        ),
      }));
      return;
    }

    setUpdateInvoiceForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateInvoice = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    const requiredFieldsOwner = validateRequiredFields(updateInvoiceForm.owner);
    const requiredFieldsClient = validateRequiredFields(
      updateInvoiceForm.client,
    );
    if (requiredFieldsOwner.length) {
      if (
        ["name", "address"].some((field) => requiredFieldsOwner.includes(field))
      ) {
        setIsUpdating(false);
        setErrorMessage("Owner name and address are required.");
        return;
      }
    }
    if (requiredFieldsClient.length) {
      if (
        ["name", "address"].some((field) =>
          requiredFieldsClient.includes(field),
        )
      ) {
        setIsUpdating(false);
        setErrorMessage("Client name and address are required.");
        return;
      }
    }

    if (updateInvoiceForm.items.some((item) => !item.title.trim())) {
      setIsUpdating(false);
      setErrorMessage("Each item must have a title.");
      return;
    }

    const body = {
      ...updateInvoiceForm,
      issuedDate: new Date(updateInvoiceForm.issuedDate.setHours(0, 0, 0, 0)),
      dueDate: new Date(updateInvoiceForm.dueDate.setHours(0, 0, 0, 0)),
    };
    try {
      const response = await invoiceService.updateInvoice(invoiceId, body);
      setIsUpdating(false);
      setSuccessToast(true);
      setIsRedirecting(true);
      await delay(2000);
      navigate(`/invoices/details/${response.data._id}`);
    } catch (error) {
      setIsUpdating(false);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      }
      if (error.response && error.response.status === 500) {
        setErrorMessage("Something went wrong. Please try again");
      }
    }
  };

  const handleAddItem = () => {
    setUpdateInvoiceForm((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          title: "New",
          quantity: 1,
          taxRate: 2.5,
          unitPrice: 0,
        },
      ],
    }));
  };

  const handleDeleteItem = (itemIndex) => {
    setUpdateInvoiceForm((prev) => ({
      ...prev,
      items: prev.items.toSpliced(itemIndex, 1),
    }));
  };

  if (isLoading || isRedirecting) {
    return (
      <>
        <div className="flex min-h-screen w-full items-center justify-center">
          {successToast && (
            <NotificationToast
              status="success"
              message="Save invoice sucessfully."
            />
          )}
          <div className="mx-auto flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <Spinner
              aria-label={`${isRedirecting && "Redirecting"} Loading spinner`}
              size="xl"
            />
            <span className="text-md font-medium text-gray-700 dark:text-gray-200">
              {isLoading ? "Loading..." : "Redirecting..."}
            </span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <section>
        <form onSubmit={handleUpdateInvoice}>
          <Card className="mb-4">
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-y-1">
                <h2 className="dark:text-white">Edit Invoice</h2>
                <p className="dark:text-white">You can edit your invoice.</p>
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
                  type="submit"
                  className="cursor-pointer"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <>
                      <Spinner aria-label="Saving loading spinner" size="sm" />
                      <span className="pl-3">Saving...</span>
                    </>
                  ) : (
                    <>Save invoice</>
                  )}
                </Button>
              </div>
            </div>
          </Card>
          <div className="p-4 border border-gray-500 border-dashed rounded">
            <div className="flex justify-center mb-2">
              {errorMessage && (
                <p className="text-red-400 first-letter:uppercase">
                  {errorMessage}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-5">
              <Card>
                <div className="grid grid-cols-[repeat(1,auto)] xl:grid-cols-[repeat(5,auto)] gap-x-5 gap-y-1 place-items-center">
                  <div className="w-full">
                    <div className="mb-2 block">
                      <Label htmlFor="invoiceNumber">Invoice Number</Label>
                    </div>
                    <TextInput
                      id="invoiceNumber"
                      type="text"
                      name="invoiceNumber"
                      value={updateInvoiceForm.invoiceNumber}
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <div className="mb-2 block">
                      <Label htmlFor="status">Status</Label>
                    </div>
                    <Select
                      id="status"
                      name="status"
                      value={updateInvoiceForm.status}
                      onChange={handleChange}
                    >
                      <option value="pending">Pending</option>
                      <option value="unpaid">Unpaid</option>
                      <option value="overdue">Overdue</option>
                      <option value="paid">Paid</option>
                    </Select>
                  </div>
                  <div className="w-full">
                    <div className="mb-2 block">
                      <Label htmlFor="issuedDate">Issued Date</Label>
                    </div>
                    <Datepicker
                      id="issuedDate"
                      value={updateInvoiceForm.issuedDate}
                      showClearButton={false}
                      onChange={(date) =>
                        handleChange(null, null, date, "issuedDate")
                      }
                    />
                  </div>
                  <div className="w-full">
                    <div className="mb-2 block">
                      <Label htmlFor="dueDate">Due Date</Label>
                    </div>
                    <Datepicker
                      id="dueDate"
                      value={updateInvoiceForm.dueDate}
                      showClearButton={false}
                      onChange={(date) =>
                        handleChange(null, null, date, "dueDate")
                      }
                    />
                  </div>
                  <div className="w-full xl:w-25">
                    <div className="mb-2 block">
                      <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    </div>
                    <TextInput
                      id="taxRate"
                      type="number"
                      name="taxRate"
                      min={0}
                      step={0.1}
                      value={updateInvoiceForm.taxRate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </Card>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-5 gap-y-5">
                <Card>
                  <h3>Bill From (Owner)</h3>
                  <div className="flex flex-col gap-y-2">
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="owner-name">Name</Label>
                      </div>
                      <TextInput
                        id="owner-name"
                        name="name"
                        type="text"
                        data-section="owner"
                        value={updateInvoiceForm.owner.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="owner-email">Email</Label>
                      </div>
                      <TextInput
                        id="owner-email"
                        name="email"
                        type="text"
                        data-section="owner"
                        value={updateInvoiceForm.owner.email}
                        onChange={handleChange}
                        placeholder="john.doe@email.com"
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="owner-address">Address</Label>
                      </div>
                      <Textarea
                        id="owner-address"
                        name="address"
                        data-section="owner"
                        value={updateInvoiceForm.owner.address}
                        onChange={handleChange}
                        rows={4}
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="owner-phone">Phone</Label>
                      </div>
                      <TextInput
                        id="owner-phone"
                        name="phone"
                        type="text"
                        data-section="owner"
                        value={updateInvoiceForm.owner.phone}
                        onChange={handleChange}
                        placeholder="262-895-635"
                      />
                    </div>
                  </div>
                </Card>
                <Card>
                  <h3>Bill To (Client)</h3>
                  <div className="flex flex-col gap-y-2">
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="client-name">Name</Label>
                      </div>
                      <TextInput
                        id="client-name"
                        name="name"
                        type="text"
                        data-section="client"
                        value={updateInvoiceForm.client.name}
                        onChange={handleChange}
                        placeholder="Alex Doe"
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="client-email">Email</Label>
                      </div>
                      <TextInput
                        id="client-email"
                        name="email"
                        type="text"
                        data-section="client"
                        value={updateInvoiceForm.client.email}
                        onChange={handleChange}
                        placeholder="alex.doe@email.com"
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="client-address">Address</Label>
                      </div>
                      <Textarea
                        id="client-address"
                        name="address"
                        data-section="client"
                        value={updateInvoiceForm.client.address}
                        onChange={handleChange}
                        rows={4}
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="client-phone">Phone</Label>
                      </div>
                      <TextInput
                        id="client-phone"
                        name="phone"
                        type="text"
                        data-section="client"
                        value={updateInvoiceForm.client.phone}
                        onChange={handleChange}
                        placeholder="569-235-489"
                      />
                    </div>
                  </div>
                </Card>
              </div>
              <Card className="overflow-x-auto">
                <Table>
                  <caption className="mb-1 p-4 text-left text-lg font-semibold text-gray-900 dark:text-white">
                    <div className="flex justify-between items-end">
                      <div className="flex flex-col">
                        <h3>Recent Invoices</h3>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">
                          Add your items.
                        </p>
                      </div>
                      <Button
                        className="cursor-pointer"
                        onClick={handleAddItem}
                      >
                        Add Item
                      </Button>
                    </div>
                  </caption>
                  <TableHead>
                    <TableRow>
                      <TableHeadCell>Title</TableHeadCell>
                      <TableHeadCell>Quantity</TableHeadCell>
                      <TableHeadCell>Tax Rate (%)</TableHeadCell>
                      <TableHeadCell>Unit Price</TableHeadCell>
                      <TableHeadCell>Total</TableHeadCell>
                      <TableHeadCell>
                        <span className="sr-only">Delete</span>
                      </TableHeadCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="divide-y">
                    {updateInvoiceForm.items.map((item, index) => {
                      return (
                        <TableRow
                          key={index}
                          className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                          <TableCell className="whitespace-nowrap">
                            <div>
                              <TextInput
                                name="title"
                                type="text"
                                data-section="items"
                                value={item.title}
                                onChange={(e) => handleChange(e, index)}
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <TextInput
                                className="w-25"
                                name="quantity"
                                type="number"
                                data-section="items"
                                step={1}
                                min={1}
                                value={item.quantity}
                                onChange={(e) => handleChange(e, index)}
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <TextInput
                                className="w-25"
                                name="taxRate"
                                type="number"
                                data-section="items"
                                value={updateInvoiceForm.taxRate}
                                disabled
                              />
                            </div>
                          </TableCell>
                          <TableCell className="capitalize">
                            <div>
                              <TextInput
                                className="w-30"
                                name="unitPrice"
                                type="number"
                                data-section="items"
                                min={0}
                                value={item.unitPrice}
                                onChange={(e) => handleChange(e, index)}
                              />
                            </div>
                          </TableCell>
                          <TableCell className="text-base dark:text-white">
                            ${item.quantity * item.unitPrice}
                          </TableCell>
                          <TableCell>
                            <Button
                              color="red"
                              className="cursor-pointer mx-auto"
                              onClick={() => handleDeleteItem(index)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {/* {invoices.map((invoice) => {
                          return (
                            <TableRow
                              key={invoice._id}
                              className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {invoice.client.name}
                              </TableCell>
                              <TableCell>#{invoice.invoiceNumber}</TableCell>
                              <TableCell>$ {invoice.total}</TableCell>
                              <TableCell className="capitalize">
                                <Dropdown
                                  inline
                                  arrowIcon={false}
                                  placement="right-start"
                                  label={
                                    <>
                                      <Badge
                                        color={badgeColor[invoice.status]}
                                        className="cursor-pointer capitalize"
                                      >
                                        {invoice.status}
                                        <ChevronDown
                                          className="ml-1 inline"
                                          size={14}
                                        />
                                      </Badge>
                                    </>
                                  }
                                >
                                  <DropdownItem
                                    onClick={() =>
                                      handleUpdateModal(invoice, "pending")
                                    }
                                  >
                                    Pending
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() =>
                                      handleUpdateModal(invoice, "unpaid")
                                    }
                                  >
                                    Unpaid
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() =>
                                      handleUpdateModal(invoice, "overdue")
                                    }
                                  >
                                    Overdue
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() => handleUpdateModal(invoice, "paid")}
                                  >
                                    Paid
                                  </DropdownItem>
                                </Dropdown>
                              </TableCell>
                              <TableCell>
                                {new Date(invoice.issuedDate).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <Dropdown
                                  inline
                                  arrowIcon={false}
                                  label={
                                    <Ellipsis className="cursor-pointer" size={20} />
                                  }
                                  className=" dark:text-white"
                                  placement="right-start"
                                >
                                  <DropdownItem
                                    as={Link}
                                    to={`/invoices/details/${invoice._id}`}
                                  >
                                    Show
                                  </DropdownItem>
                                  <DropdownItem
                                    as={Link}
                                    to={`/invoices/edit/${invoice._id}`}
                                  >
                                    Edit
                                  </DropdownItem>
                                  <DropdownDivider />
                                  <DropdownItem
                                    onClick={() => handleDeleteModal(invoice)}
                                  >
                                    Delete
                                  </DropdownItem>
                                </Dropdown>
                              </TableCell>
                            </TableRow>
                          );
                        })} */}
                  </TableBody>
                </Table>
              </Card>
              {/* <div className="flex flex-col gap-y-2">
                    <div className="flex justify-between">
                      <h2>Items</h2>
                      <Button className="cursor-pointer" onClick={handleAddItem}>
                        Add item
                      </Button>
                    </div>
                    {createInvoiceForm.items.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <div>
                            <div className="mb-2 block">
                              <Label htmlFor="items-title">Title</Label>
                            </div>
                            <TextInput
                              id="items-title"
                              name="title"
                              type="text"
                              data-section="items"
                              value={item.title}
                              onChange={(e) => handleChange(e, index)}
                            />
                          </div>
                          <div>
                            <div className="mb-2 block">
                              <Label htmlFor="items-quantity">Quantity</Label>
                            </div>
                            <TextInput
                              className="w-25"
                              id="items-quantity"
                              name="quantity"
                              type="number"
                              data-section="items"
                              step={1}
                              min={1}
                              value={item.quantity}
                              onChange={(e) => handleChange(e, index)}
                            />
                          </div>
                          <div>
                            <div className="mb-2 block">
                              <Label htmlFor="items-taxRate">Tax Rate (%)</Label>
                            </div>
                            <TextInput
                              className="w-25"
                              id="items-taxRate"
                              name="taxRate"
                              type="number"
                              data-section="items"
                              value={createInvoiceForm.taxRate}
                              disabled
                            />
                          </div>
                          <div>
                            <div className="mb-2 block">
                              <Label htmlFor="items-unitPrice">Unit Price</Label>
                            </div>
                            <TextInput
                              id="items-unitPrice"
                              name="unitPrice"
                              type="number"
                              data-section="items"
                              min={0}
                              value={item.unitPrice}
                              onChange={(e) => handleChange(e, index)}
                            />
                          </div>
                          <div>
                            <div className="mb-2 block">Total</div>
                            <span>${item.quantity * item.unitPrice || "0"}</span>
                          </div>
                          <div>
                            <Button
                              color="red"
                              className="cursor-pointer"
                              onClick={() => handleDeleteItem(index)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div> */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-5">
                <Card>
                  <div>
                    <h3>Notes</h3>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                      Write a quick note to your client.
                    </p>
                  </div>
                  <div>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={updateInvoiceForm.notes}
                      onChange={handleChange}
                      rows={5}
                    />
                  </div>
                </Card>
                <Card className="w-full">
                  <div className="space-y-4">
                    <h3>Invoice Summary</h3>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between text-gray-600 dark:text-gray-400">
                        <span>Subtotal</span>
                        <span className="text-gray-900 dark:text-white">
                          ${totals.subTotal.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-between text-gray-600 dark:text-gray-400">
                        <span>Tax ({updateInvoiceForm.taxRate || 0}%)</span>
                        <span className="text-gray-900 dark:text-white">
                          ${totals.taxAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          Total
                        </h4>

                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          ${totals.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
                {/* <Card>
                      <div className="flex flex-col gap-y-3 items-center flex-1">
                        <div>
                          Tax Rate (%)
                          <span className="ml-2">
                            {createInvoiceForm.taxRate || "0"}%
                          </span>
                        </div>
                        <div>
                          Tax Amount
                          <span className="ml-2">
                            ${totals.taxAmount.toFixed(1) || "0"}
                          </span>
                        </div>
                        <div>
                          Sub Total
                          <span className="ml-2">
                            ${totals.subTotal.toFixed(1) || "0"}
                          </span>
                        </div>
                        <div>
                          Total
                          <span className="ml-2">
                            ${totals.total.toFixed(1) || "0"}
                          </span>
                        </div>
                      </div>
                    </Card> */}
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

{
  /* <form
  className="flex max-w-screen px-10 flex-col gap-y-8"
  onSubmit={handleUpdateInvoice}
>
  <div className="flex justify-between">
    <div>
      <div className="mb-2 block">
        <Label htmlFor="invoiceNumber">Invoice Number</Label>
      </div>
      <TextInput
        id="invoiceNumber"
        type="text"
        name="invoiceNumber"
        value={updateInvoiceForm.invoiceNumber}
        disabled
      />
    </div>
    <div>
      <div className="mb-2 block">
        <Label htmlFor="status">Status</Label>
      </div>
      <Select
        className="w-30"
        id="status"
        name="status"
        value={updateInvoiceForm.status}
        onChange={handleChange}
      >
        <option value="pending">Pending</option>
        <option value="unpaid">Unpaid</option>
        <option value="overdue">Overdue</option>
        <option value="paid">Paid</option>
      </Select>
    </div>
    <div>
      <div className="mb-2 block">
        <Label htmlFor="issuedDate">Issued Date</Label>
      </div>
      <Datepicker
        id="issuedDate"
        value={updateInvoiceForm.issuedDate}
        showClearButton={false}
        onChange={(date) => handleChange(null, null, date, "issuedDate")}
      />
    </div>
    <div>
      <div className="mb-2 block">
        <Label htmlFor="dueDate">Due Date</Label>
      </div>
      <Datepicker
        id="dueDate"
        value={updateInvoiceForm.dueDate}
        showClearButton={false}
        onChange={(date) => handleChange(null, null, date, "dueDate")}
      />
    </div>
    <div>
      <div className="mb-2 block">
        <Label htmlFor="taxRate">Tax Rate (%)</Label>
      </div>
      <TextInput
        className="w-25"
        id="taxRate"
        type="number"
        name="taxRate"
        min={0}
        step={0.1}
        value={updateInvoiceForm.taxRate}
        onChange={handleChange}
      />
    </div>
  </div>
  <div className="flex gap-x-15 justify-center">
    <div className="flex flex-col flex-1">
      <h2>Bill From (Owner)</h2>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="owner-name">Name</Label>
        </div>
        <TextInput
          id="owner-name"
          name="name"
          type="text"
          data-section="owner"
          value={updateInvoiceForm.owner.name}
          onChange={handleChange}
          placeholder="John Doe"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="owner-email">Email</Label>
        </div>
        <TextInput
          id="owner-email"
          name="email"
          type="text"
          data-section="owner"
          value={updateInvoiceForm.owner.email}
          onChange={handleChange}
          placeholder="john.doe@email.com"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="owner-address">Address</Label>
        </div>
        <Textarea
          id="owner-address"
          name="address"
          data-section="owner"
          value={updateInvoiceForm.owner.address}
          onChange={handleChange}
          rows={4}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="owner-phone">Phone</Label>
        </div>
        <TextInput
          id="owner-phone"
          name="phone"
          type="text"
          data-section="owner"
          value={updateInvoiceForm.owner.phone}
          onChange={handleChange}
          placeholder="262-895-635"
        />
      </div>
    </div>
    <div className="flex flex-col flex-1">
      <h2>Bill To (Client)</h2>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="client-name">Name</Label>
        </div>
        <TextInput
          id="client-name"
          name="name"
          type="text"
          data-section="client"
          value={updateInvoiceForm.client.name}
          onChange={handleChange}
          placeholder="Alex Doe"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="client-email">Email</Label>
        </div>
        <TextInput
          id="client-email"
          name="email"
          type="text"
          data-section="client"
          value={updateInvoiceForm.client.email}
          onChange={handleChange}
          placeholder="alex.doe@email.com"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="client-address">Address</Label>
        </div>
        <Textarea
          id="client-address"
          name="address"
          data-section="client"
          value={updateInvoiceForm.client.address}
          onChange={handleChange}
          rows={4}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="client-phone">Phone</Label>
        </div>
        <TextInput
          id="client-phone"
          name="phone"
          type="text"
          data-section="client"
          value={updateInvoiceForm.client.phone}
          onChange={handleChange}
          placeholder="569-235-489"
        />
      </div>
    </div>
  </div>
  <div className="flex flex-col gap-y-2">
    <div className="flex justify-between">
      <h2>Items</h2>
      <Button className="cursor-pointer" onClick={handleAddItem}>
        Add item
      </Button>
    </div>
    {updateInvoiceForm.items.map((item, index) => {
      return (
        <div key={index} className="flex justify-between items-center">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="items-title">Title</Label>
            </div>
            <TextInput
              id="items-title"
              name="title"
              type="text"
              data-section="items"
              value={item.title}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="items-quantity">Quantity</Label>
            </div>
            <TextInput
              className="w-25"
              id="items-quantity"
              name="quantity"
              type="number"
              data-section="items"
              step={1}
              min={1}
              value={item.quantity}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="items-taxRate">Tax Rate (%)</Label>
            </div>
            <TextInput
              className="w-25"
              id="items-taxRate"
              name="taxRate"
              type="number"
              data-section="items"
              value={updateInvoiceForm.taxRate}
              disabled
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="items-unitPrice">Unit Price</Label>
            </div>
            <TextInput
              id="items-unitPrice"
              name="unitPrice"
              type="number"
              data-section="items"
              min={0}
              value={item.unitPrice}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
          <div>
            <div className="mb-2 block">Total</div>
            <span>${item.quantity * item.unitPrice || "0"}</span>
          </div>
          <div>
            <Button
              color="red"
              className="cursor-pointer"
              onClick={() => handleDeleteItem(index)}
            >
              Delete
            </Button>
          </div>
        </div>
      );
    })}
  </div>
  <div className="flex justify-between">
    <div className="flex-1">
      <div className="mb-2 block">
        <Label htmlFor="notes">Notes</Label>
      </div>
      <Textarea
        id="notes"
        name="notes"
        value={updateInvoiceForm.notes}
        onChange={handleChange}
        rows={4}
      />
    </div>
    <div className="flex flex-col gap-y-3 items-center flex-1">
      <div>
        Tax Rate (%)
        <span className="ml-2">{updateInvoiceForm.taxRate || "0"}%</span>
      </div>
      <div>
        Tax Amount
        <span className="ml-2">${totals.taxAmount.toFixed(1) || "0"}</span>
      </div>
      <div>
        Sub Total
        <span className="ml-2">${totals.subTotal.toFixed(1) || "0"}</span>
      </div>
      <div>
        Total
        <span className="ml-2">${totals.total.toFixed(1) || "0"}</span>
      </div>
    </div>
  </div>
  <div className="flex justify-center">
    {errorMessage && (
      <p className="text-red-400 first-letter:uppercase">{errorMessage}</p>
    )}
  </div>
  <Button type="submit" className="cursor-pointer" disabled={isUpdating}>
    {isUpdating ? (
      <>
        <Spinner aria-label="Saving loading spinner" size="sm" />
        <span className="pl-3">Saving...</span>
      </>
    ) : (
      <>Save invoice</>
    )}
  </Button>
</form>; */
}

export default EditInvoice;

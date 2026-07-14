import {
  Label,
  TextInput,
  Textarea,
  Select,
  Datepicker,
  Button,
  Spinner,
  Toast,
} from "flowbite-react";
import { use, useState, useMemo, useContext } from "react";
import invoiceService from "../../../services/invoice.service";
import validateRequiredFields from "../../../utils/validateRequiredFields";
import delay from "../../../utils/delay";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import calculateInvoiceTotals from "../../../utils/calculateInvoiceTotals";
import { AuthContext } from "../../../contexts/auth.context";

const CreateInvoice = () => {
  const [createInvoiceForm, setCreateInvoiceForm] = useState({
    owner: {
      name: "",
      email: "",
      address: "",
      phone: "",
    },
    client: {
      name: "",
      email: "",
      address: "",
      phone: "",
    },
    items: [
      {
        title: "Test 1",
        quantity: 1,
        taxRate: 2.5,
        unitPrice: 0,
      },
      {
        title: "Test 2",
        quantity: 1,
        taxRate: 2.5,
        unitPrice: 0,
      },
      {
        title: "Test 3",
        quantity: 1,
        taxRate: 2.5,
        unitPrice: 0,
      },
    ],
    status: "pending",
    issuedDate: new Date(),
    dueDate: new Date(),
    taxRate: 2.5,
    notes: "",
  });
  const [isCreating, setIsCreating] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const totals = useMemo(() => {
    return calculateInvoiceTotals(
      createInvoiceForm.items,
      createInvoiceForm.taxRate,
    );
  }, [createInvoiceForm.items, createInvoiceForm.taxRate]);

  const handleChange = (e, itemIndex, date, dateField) => {
    if (date && dateField) {
      setCreateInvoiceForm((prev) => ({
        ...prev,
        [dateField]: date,
      }));
      return;
    }

    const { name, value } = e.target;
    const section = e.target.dataset.section;

    if (name === "taxRate") {
      setCreateInvoiceForm((prev) => ({
        ...prev,
        [name]: value,
        items: prev.items.map((item) => ({
          ...prev.items,
          [name]: value,
        })),
      }));
    }

    if (section && (section === "client" || section === "owner")) {
      setCreateInvoiceForm((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value,
        },
      }));
      return;
    }

    if (section && section === "items") {
      setCreateInvoiceForm((prev) => ({
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

    setCreateInvoiceForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    console.log("Creating new invoice...");
    setIsCreating(true);

    const requiredFieldsOwner = validateRequiredFields(createInvoiceForm.owner);
    const requiredFieldsClient = validateRequiredFields(
      createInvoiceForm.client,
    );
    if (requiredFieldsOwner.length) {
      setIsCreating(false);
      if (
        ["name", "address"].some((field) => requiredFieldsOwner.includes(field))
      ) {
        setErrorMessage("Owner name and address are required.");
        return;
      }
    }
    if (requiredFieldsClient.length) {
      setIsCreating(false);
      if (
        ["name", "address"].some((field) =>
          requiredFieldsClient.includes(field),
        )
      ) {
        setErrorMessage("Client name and address are required.");
        return;
      }
    }

    if (createInvoiceForm.items.some((item) => !item.title.trim())) {
      setIsCreating(false);
      setErrorMessage("Each item must have a title.");
      return;
    }

    const body = {
      ...createInvoiceForm,
    };
    console.log(body);
    try {
      const response = await invoiceService.createInvoice(body);
      console.log(response);
      setIsCreating(false);
      setSuccessToast(true);
      setIsRedirecting(true);
      await delay(2000);
      navigate(`/invoices/details/${response.data._id}`);
    } catch (error) {
      console.log(error.response);
      setIsCreating(false);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      }
      if (error.response && error.response.status === 500) {
        setErrorMessage("Something went wrong. Please try again");
      }
    }
  };

  const handleDeleteItem = (itemIndex) => {
    setCreateInvoiceForm((prev) => ({
      ...prev,
      items: prev.items.toSpliced(itemIndex, 1),
    }));
  };

  if (isRedirecting) {
    return (
      <>
        {successToast && (
          <Toast className="border border-gray-100">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <Check size={14} />
            </div>
            <div className="ml-3 text-sm font-normal">
              Save invoice successfully.
            </div>
          </Toast>
        )}
        <div className="mx-auto flex flex-col gap-2 items-center">
          <Spinner aria-label="Redirecting loading spinner" size="xl" />
          <span className="text-md">Redirecting...</span>
        </div>
      </>
    );
  }

  return (
    <>
      <h1>CreateInvoice component</h1>
      <form
        className="flex max-w-screen px-10 flex-col gap-y-8"
        onSubmit={handleCreateInvoice}
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
              value={`INV-${String(user.invoices.nextInvoiceNumber).padStart(3, "0")}`}
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
              value={createInvoiceForm.status}
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
              value={createInvoiceForm.issuedDate}
              onChange={(date) => handleChange(null, null, date, "issuedDate")}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="dueDate">Due Date</Label>
            </div>
            <Datepicker
              id="dueDate"
              value={createInvoiceForm.dueDate}
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
              value={createInvoiceForm.taxRate}
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
                value={createInvoiceForm.owner.name}
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
                value={createInvoiceForm.owner.email}
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
                value={createInvoiceForm.owner.address}
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
                value={createInvoiceForm.owner.phone}
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
                value={createInvoiceForm.client.name}
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
                value={createInvoiceForm.client.email}
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
                value={createInvoiceForm.client.address}
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
                value={createInvoiceForm.client.phone}
                onChange={handleChange}
                placeholder="569-235-489"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <h2>Items</h2>
          {createInvoiceForm.items.map((item, index) => {
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
                    value={item.taxRate}
                    onChange={(e) => handleChange(e, index)}
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
              value={createInvoiceForm.notes}
              onChange={handleChange}
              rows={4}
            />
          </div>
          <div className="flex flex-col gap-y-3 items-center flex-1">
            <div>
              Tax Rate (%)
              <span className="ml-2">{createInvoiceForm.taxRate || "0"}%</span>
            </div>
            <div>
              Tax Amount
              <span className="ml-2">
                ${totals.taxAmount.toFixed(1) || "0"}
              </span>
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
            <p className="text-red-400 first-letter:uppercase">
              {errorMessage}
            </p>
          )}
        </div>
        <Button type="submit" className="cursor-pointer">
          {isCreating ? (
            <>
              <Spinner aria-label="Saving loading spinner" size="sm" />
              <span className="pl-3">Saving...</span>
            </>
          ) : (
            <>Save invoice</>
          )}
        </Button>
      </form>
    </>
  );
};

export default CreateInvoice;

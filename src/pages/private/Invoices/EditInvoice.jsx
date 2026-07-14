import { useEffect, useState } from "react";
import invoiceService from "../../../services/invoice.service";
import { useParams } from "react-router-dom";
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

const EditInvoice = () => {
  const { invoiceId } = useParams();
  const [updateInvoiceForm, setUpdateInvoiceForm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await invoiceService.getInvoice(invoiceId);
      console.log(response);
      setIsLoading(false);
      setUpdateInvoiceForm(response.data);
    } catch (error) {
      console.log(error.response);
      // navigate("/error-page") // Redirect to error page
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
      <h1>EditInvoice component</h1>
      <form
        className="flex max-w-screen px-10 flex-col gap-y-8"
        onSubmit={undefined}
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
              // value={`INV-${String(user.invoices.nextInvoiceNumber).padStart(3, "0")}`}
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
              value={undefined}
              onChange={undefined}
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
              value={undefined}
              // onChange={(date) => handleChange(null, null, date, "issuedDate")}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="dueDate">Due Date</Label>
            </div>
            <Datepicker
              id="dueDate"
              value={undefined}
              // onChange={(date) => handleChange(null, null, date, "dueDate")}
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
              value={undefined}
              onChange={undefined}
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
                value={undefined}
                onChange={undefined}
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
                value={undefined}
                onChange={undefined}
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
                value={undefined}
                onChange={undefined}
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
                value={undefined}
                onChange={undefined}
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
                value={undefined}
                onChange={undefined}
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
                value={undefined}
                onChange={undefined}
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
                value={undefined}
                onChange={undefined}
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
                value={undefined}
                onChange={undefined}
                placeholder="569-235-489"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <h2>Items</h2>
          {/* {createClientForm.items.map((item, id) => {
            return (
              <div key={id} className="flex justify-between items-center">
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
                    onChange={(e) => handleChange(e, id)}
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
                    value={item.quantity}
                    onChange={(e) => handleChange(e, id)}
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
                    onChange={(e) => handleChange(e, id)}
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
                    value={item.unitPrice}
                    onChange={(e) => handleChange(e, id)}
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
                    onClick={() => handleDeleteItem(id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })} */}
        </div>
        <div className="flex justify-between">
          <div className="flex-1">
            <div className="mb-2 block">
              <Label htmlFor="notes">Notes</Label>
            </div>
            <Textarea
              id="notes"
              name="notes"
              value={undefined}
              onChange={undefined}
              rows={4}
            />
          </div>
          <div className="flex flex-col gap-y-3 items-center flex-1">
            <div>
              Tax Rate (%)
              {/* <span className="ml-2">{createClientForm.taxRate || "0"}%</span> */}
            </div>
            <div>
              Tax Amount
              <span className="ml-2">
                {/* ${totals.taxAmount.toFixed(1) || "0"} */}
              </span>
            </div>
            <div>
              Sub Total
              {/* <span className="ml-2">${totals.subTotal.toFixed(1) || "0"}</span> */}
            </div>
            <div>
              Total
              {/* <span className="ml-2">${totals.total.toFixed(1) || "0"}</span> */}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          {/* {errorMessage && (
            <p className="text-red-400 first-letter:uppercase">
              {errorMessage}
            </p>
          )} */}
          Error Message
        </div>
        <Button type="submit" className="cursor-pointer">
          {/* {isCreating ? (
            <>
              <Spinner aria-label="Saving loading spinner" size="sm" />
              <span className="pl-3">Saving...</span>
            </>
          ) : (
            <>Save invoice</>
          )} */}
          Save invoice
        </Button>
      </form>
    </>
  );
};

export default EditInvoice;

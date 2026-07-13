import {
  Label,
  TextInput,
  Textarea,
  Select,
  Datepicker,
  Button,
} from "flowbite-react";

const CreateInvoice = () => {
  return (
    <>
      <h1>CreateInvoice component</h1>
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
              value={undefined}
              onChange={undefined}
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
              <option value="">Unpaid</option>
              <option value="">Pending</option>
              <option value="">Overdue</option>
              <option value="">Paid</option>
            </Select>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="issuedDate">Issued Date</Label>
            </div>
            <Datepicker
              id="issuedDate"
              name="issuedDate"
              value={undefined}
              onChange={undefined}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="dueDate">Due Date</Label>
            </div>
            <Datepicker
              id="dueDate"
              name="dueDate"
              value={undefined}
              onChange={undefined}
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
          <div className="flex justify-between items-center">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title">Title</Label>
              </div>
              <TextInput
                id="title"
                name="title"
                type="text"
                value={undefined}
                onChange={undefined}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="quantity">Quantity</Label>
              </div>
              <TextInput
                className="w-25"
                id="quantity"
                name="quantity"
                type="number"
                value={undefined}
                onChange={undefined}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
              </div>
              <TextInput
                className="w-25"
                id="taxRate"
                name="taxRate"
                type="number"
                value={undefined}
                onChange={undefined}
                disabled
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="unitPrice">Unit Price</Label>
              </div>
              <TextInput
                id="unitPrice"
                name="unitPrice"
                type="number"
                value={undefined}
                onChange={undefined}
              />
            </div>
            <div>
              <div className="mb-2 block">Total</div>
              <span>$0</span>
            </div>
            <div>
              <Button color="red" className="cursor-pointer">
                Delete
              </Button>
            </div>
          </div>
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
              Tax Rate (%)<span className="ml-2">0%</span>
            </div>
            <div>
              Tax Amount<span className="ml-2">$0</span>
            </div>
            <div>
              Sub Total<span className="ml-2">$0</span>
            </div>
            <div>
              Total<span className="ml-2">$0</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="text-red-400 first-letter:uppercase">Error Message</p>
        </div>
        <Button type="submit" className="cursor-pointer">
          Save Invoice
        </Button>
      </form>
    </>
  );
};

export default CreateInvoice;

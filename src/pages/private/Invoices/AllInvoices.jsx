import { useEffect, useState } from "react";
import invoiceService from "../../../services/invoice.service";
import {
  Spinner,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Toast,
  TextInput,
} from "flowbite-react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import delay from "../../../utils/delay";
import useDebounce from "../../../hooks/useDebounce";

const ALlInvoices = () => {
  const [invoices, setInvoices] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const searchQueryDebounced = useDebounce(searchQuery);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, [searchQueryDebounced]);

  const getData = async () => {
    try {
      console.log(searchQuery);
      const response =
        await invoiceService.getAllInvoices(searchQueryDebounced);
      console.log(response);
      setIsLoading(false);
      setInvoices(response.data);
    } catch (error) {
      console.log(error.response);
      // navigate("error-page") // Redirecto to error page
    }
  };

  const handleDeleteInvoice = async (invoiceId) => {
    console.log("Deleting invoice with id: " + invoiceId);
    setIsDeleting(true);
    try {
      const response = await invoiceService.deleteInvoice(invoiceId);
      console.log(response);
      setIsDeleting(false);
      getData();
      setOpenDeleteModal(false);
      setSuccessToast(true);
      await delay(2000);
      setSuccessToast(false);
    } catch (error) {
      console.log(error.response);
      setIsDeleting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery(value);
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
      <TextInput
        className="w-100"
        placeholder="search"
        name="search"
        type="text"
        value={searchQuery}
        onChange={handleChange}
      />
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
                onClick={() => setOpenDeleteModal(true)}
              >
                Delete
              </Button>
            </div>
            <Modal
              show={openDeleteModal}
              onClose={() => setOpenDeleteModal(false)}
            >
              <ModalHeader>Delete invoice</ModalHeader>
              <ModalBody>
                <div className="space-y-6">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Do you wish to delete this invoice ?
                  </p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Please click on delete if you wish so, or cancel to back to
                    the page.
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
                  onClick={() => handleDeleteInvoice(invoice._id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <Spinner
                        aria-label="Deleting loading spinner"
                        size="sm"
                      />
                      <span className="pl-3">Loading...</span>
                    </>
                  ) : (
                    <>Delete</>
                  )}
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        );
      })}
    </>
  );
};

export default ALlInvoices;

import { useContext, useEffect, useState } from "react";
import clientService from "../../../services/client.service";
import { useNavigate } from "react-router-dom";
import {
  Spinner,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Label,
  TextInput,
  Textarea,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Dropdown,
  DropdownItem,
  DropdownDivider,
} from "flowbite-react";
import validateRequiredFields from "../../../utils/validateRequiredFields";
import { Check, Ellipsis } from "lucide-react";
import delay from "../../../utils/delay";
import useDebounce from "../../../hooks/useDebounce";
import { ClientStatsContext } from "../../../contexts/clientStats.context";
import NotificationToast from "../../../components/ui/NotificationToast";
import ConfirmationModal from "../../../components/ui/ConfirmationModal";

const AllClients = () => {
  const [clients, setClients] = useState(null);
  const { clientStats, getData: getClientStats } =
    useContext(ClientStatsContext);

  const [updateClientForm, setUpdateClientForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [successUpdateToast, setSuccessUpdateToast] = useState(false);
  const [successDeleteToast, setSuccessDeleteToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const searchQueryDebounced = useDebounce(searchQuery);

  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [searchQueryDebounced]);

  const getData = async () => {
    try {
      const response = await clientService.getAllClients(searchQueryDebounced);
      setIsLoading(false);
      setClients(response.data);
    } catch (error) {
      // navigate("/error-page"); // Redirect to error-page
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "search") {
      setSearchQuery(value);
      return;
    }
    setUpdateClientForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getClientData = async (clientId) => {
    setIsLoading(true);
    try {
      const response = await clientService.getClient(clientId);
      console.log(response);
      setUpdateClientForm(response.data);
      setIsLoading(false); // Update Loading method later - just disabling btn for e.g
    } catch (error) {
      // console.log(error.response);
      setIsLoading(false);
      setErrorToast(true);
      await delay(2000);
      setErrorToast(false);
      throw error;
    }
  };

  const handleUpdateModal = async (client) => {
    console.log("selected client..." + client._id);
    setSelectedClient(client);
    try {
      await getClientData(client._id);
      setOpenUpdateModal(true);
    } catch (error) {
      setOpenUpdateModal(false);
      setSelectedClient(null);
    }
  };

  const handleUpdateClient = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    const requiredFields = validateRequiredFields(updateClientForm);
    if (requiredFields.length) {
      if (["name", "address"].some((field) => requiredFields.includes(field))) {
        setIsUpdating(false);
        setErrorMessage("Name and address are required.");
        return;
      }
    }

    const body = {
      ...updateClientForm,
    };
    try {
      const response = await clientService.updateClient(
        selectedClient._id,
        body,
      );
      await getData(); // refresh the page with new data
      setIsUpdating(false);
      setOpenUpdateModal(false); // close the modal after editing
      setSuccessUpdateToast(true); // toggle success toast
      await delay(2000);
      setSuccessUpdateToast(false); // toggle success toast
    } catch (error) {
      setIsUpdating(false);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      }
      if (error.response && error.response.status === 500) {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  const handleDeleteModal = (client) => {
    console.log("triggering delete modal");
    setSelectedClient(client);
    setOpenDeleteModal(true);
  };

  const handleDeleteClient = async () => {
    setIsDeleting(true);
    try {
      const response = await clientService.deleteClient(selectedClient._id);
      await getData();
      await getClientStats();
      setIsDeleting(false);
      setOpenDeleteModal(false);
      setSelectedClient(null);
      setSuccessDeleteToast(true);
      await delay(2000);
      setSuccessDeleteToast(false);
    } catch (error) {
      setIsLoading(false);
      setErrorToast(true);
      await delay(2000);
      setErrorToast(false);
    }
  };

  if (isLoading || !clientStats) {
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
      {successUpdateToast && (
        <NotificationToast
          status="success"
          message="Update client successfully"
        />
      )}
      {successDeleteToast && (
        <NotificationToast
          status="success"
          message="Delete client successfully"
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
            <h2 className="dark:text-white">All Clients</h2>
            <p className="dark:text-white">
              You can browse, manage and see all your clients.
            </p>
          </div>
        </Card>
        <div className="p-4 border border-gray-500 border-dashed rounded">
          <Card className="overflow-x-auto">
            <div className="flex justify-between mb-2">
              <div className="w-120">
                <div className="mb-2 block">
                  <Label htmlFor="search">Search</Label>
                </div>
                <TextInput
                  id="search"
                  placeholder="search"
                  name="search"
                  type="text"
                  value={searchQuery}
                  onChange={handleChange}
                />
              </div>
              <div className="dark:text-white flex flex-col justify-start items-end">
                <p>
                  <strong>Total clients :</strong> {clientStats.totalClients}
                </p>
              </div>
            </div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell>Name</TableHeadCell>
                  <TableHeadCell>Email</TableHeadCell>
                  <TableHeadCell>Address</TableHeadCell>
                  <TableHeadCell>Phone</TableHeadCell>
                  <TableHeadCell>
                    <span className="sr-only">Actions</span>
                  </TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody className="divide-y">
                {clients.map((client) => {
                  return (
                    <TableRow
                      key={client._id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {client.name}
                      </TableCell>
                      <TableCell>{client.email || "N/A"}</TableCell>
                      <TableCell>{client.address}</TableCell>
                      <TableCell>{client.phone || "N/A"}</TableCell>
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
                            onClick={() => handleUpdateModal(client)}
                          >
                            Edit
                          </DropdownItem>
                          <DropdownDivider />
                          <DropdownItem
                            onClick={() => handleDeleteModal(client)}
                          >
                            Delete
                          </DropdownItem>
                        </Dropdown>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
          <Modal
            show={openUpdateModal}
            onClose={() => setOpenUpdateModal(false)}
          >
            <ModalHeader>Update form modal Client</ModalHeader>
            <form className="" onSubmit={(e) => handleUpdateClient(e)}>
              <ModalBody>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name">Name</Label>
                  </div>
                  <TextInput
                    id="name"
                    type="text"
                    name="name"
                    value={updateClientForm.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email">Email</Label>
                  </div>
                  <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={updateClientForm.email}
                    onChange={handleChange}
                    placeholder="john.doe@mail.com"
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="address">Address</Label>
                  </div>
                  <Textarea
                    id="address"
                    name="address"
                    value={updateClientForm.address}
                    onChange={handleChange}
                    placeholder="Type your address..."
                    rows={4}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="phone">Phone</Label>
                  </div>
                  <TextInput
                    id="phone"
                    name="phone"
                    type="text"
                    value={updateClientForm.phone}
                    onChange={handleChange}
                    placeholder="262-895-635"
                  />
                </div>
                <div className="flex justify-center">
                  {errorMessage && (
                    <p className="text-red-400 first-letter:uppercase">
                      {errorMessage}
                    </p>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="w-full flex gap-x-2 justify-end">
                  <Button
                    className="cursor-pointer"
                    color="gray"
                    onClick={() => setOpenUpdateModal(false)}
                    disabled={isUpdating}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="cursor-pointer"
                    color="blue"
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <>
                        <Spinner
                          aria-label="Updating loading spinner"
                          size="sm"
                        />
                        <span className="pl-3">Editing...</span>
                      </>
                    ) : (
                      <>Edit client</>
                    )}
                  </Button>
                </div>
              </ModalFooter>
            </form>
          </Modal>
          <ConfirmationModal
            show={openDeleteModal}
            status={"delete"}
            title={"Delete client"}
            message={"Do you wish to delete this client ?"}
            confirmText={"Delete"}
            isLoading={isDeleting}
            onClose={() => setOpenDeleteModal(false)}
            onConfirm={handleDeleteClient}
          />
        </div>
      </section>
    </>
  );
};

export default AllClients;

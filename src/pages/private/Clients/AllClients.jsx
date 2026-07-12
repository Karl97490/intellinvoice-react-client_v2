import { useEffect, useState } from "react";
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
} from "flowbite-react";

const AllClients = () => {
  const [clients, setClients] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await clientService.getAllClients();
      console.log(response);
      setIsLoading(false);
      setClients(response.data);
    } catch (error) {
      console.log(error.response);
      // navigate("/error-page"); // Redirect to error-page
    }
  };

  const handleOpenUpdateModalForm = async (id) => {
    console.log("opening update modal client form with client id: " + id);
    setIsLoading(true);
    try {
      const response = await clientService.getClient(id);
      console.log(response);
      setOpenUpdateModal(true);
      setIsLoading(false); // Update Loading method later - just disabling btn for e.g
    } catch (error) {
      console.log(error.response);
      setIsLoading(false);
    }
  };

  const handleDeleteClient = async (id) => {
    console.log("deleting client with id: " + id);
    setIsLoading(true);
    try {
      const response = await clientService.deleteClient(id);
      console.log(response);
      setIsLoading(false); // Update Loading method later - just disabling btn for e.g
      getData();
    } catch (error) {
      console.log(error.response);
      setIsLoading(false);
      // error message or toast
    }
  };

  if (isLoading) {
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
      <h1>AllClients component...</h1>
      <span>{clients.length || "0"} clients</span>
      {clients.map((client) => {
        return (
          <div key={client._id}>
            <span>{client.name}</span>
            <Button
              color="red"
              className="cursor-pointer"
              onClick={() => handleDeleteClient(client._id)}
            >
              Delete
            </Button>
            <Button
              color="blue"
              className="cursor-pointer"
              onClick={() => handleOpenUpdateModalForm(client._id)}
            >
              Edit
            </Button>
          </div>
        );
      })}
      <Modal show={openUpdateModal} onClose={() => setOpenUpdateModal(false)}>
        <ModalHeader>Update form modal Client</ModalHeader>
        <form className="" onSubmit={undefined}>
          <ModalBody>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name">Name</Label>
              </div>
              <TextInput
                id="name"
                type="text"
                name="name"
                value={undefined}
                onChange={undefined}
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
                value={undefined}
                onChange={undefined}
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
                value={undefined}
                onChange={undefined}
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
                value={undefined}
                onChange={undefined}
                placeholder="262-895-635"
              />
            </div>
            <div className="flex justify-center">
              <p className="text-red-400 first-letter:uppercase">
                Error Message
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="w-full flex gap-x-2 justify-end">
              <Button
                className="cursor-pointer"
                color="gray"
                onClick={() => setOpenUpdateModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="cursor-pointer" color="blue">
                Edit client
              </Button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
};

export default AllClients;

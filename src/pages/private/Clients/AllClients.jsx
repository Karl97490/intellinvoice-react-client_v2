import { useEffect, useState } from "react";
import clientService from "../../../services/client.service";
import { useNavigate } from "react-router-dom";
import { Spinner, Button } from "flowbite-react";

const AllClients = () => {
  const [clients, setClients] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const handleDeleteClient = async (id) => {
    console.log("deleting client with id: " + id);
    try {
      const response = await clientService.deleteClient(id);
      console.log(response);
      getData();
    } catch (error) {
      console.log(error.response);
      // error message or toast
    }
  };

  const getData = async () => {
    try {
      const response = await clientService.allClients();
      console.log(response);
      setIsLoading(false);
      setClients(response.data);
    } catch (error) {
      console.log(error.response);
      // navigate("/error-page"); // Redirect to error-page
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
          </div>
        );
      })}
    </>
  );
};

export default AllClients;

import { useEffect, useState } from "react";
import clientService from "../../../services/client.service";
import { useNavigate } from "react-router-dom";

const AllClients = () => {
  const [clients, setClients] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await clientService.allClients();
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
      // navigate("/error-page"); // Redirect to error-page
    }
  };
  return <h1>AllClients component...</h1>;
};

export default AllClients;

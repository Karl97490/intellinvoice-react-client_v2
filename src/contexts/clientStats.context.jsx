import { createContext, useContext, useEffect, useState } from "react";
import clientService from "../services/client.service";
import { Spinner } from "flowbite-react";
import { AuthContext } from "./auth.context";

const ClientStatsContext = createContext();

const ClientStatsProviderWrapper = (props) => {
  const [clientStats, setClientStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    getData();
  }, [user]);

  const getData = async () => {
    try {
      const response = await clientService.getClientStats();
      console.log(response.data);
      setClientStats(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
      setClientStats(null);
      setIsLoading(false);
      throw error;
    }
  };

  const statsContext = {
    clientStats,
    getData,
  };

  return (
    <ClientStatsContext.Provider value={statsContext}>
      {props.children}
    </ClientStatsContext.Provider>
  );
};

export { ClientStatsContext, ClientStatsProviderWrapper };

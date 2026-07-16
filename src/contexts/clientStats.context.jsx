import { createContext, useEffect, useState } from "react";
import clientService from "../services/client.service";
import { Spinner } from "flowbite-react";

const ClientStatsContext = createContext();

const ClientStatsProviderWrapper = (props) => {
  const [clientStats, setClientStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await clientService.getClientStats();
      console.log(response.data);
      setIsLoading(false);
      setClientStats(response.data);
    } catch (error) {
      console.log(error.response);
      setIsLoading(false);
      setClientStats(null);
      throw error;
    }
  };

  const statsContext = {
    clientStats,
    getData,
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
    <ClientStatsContext.Provider value={statsContext}>
      {props.children}
    </ClientStatsContext.Provider>
  );
};

export { ClientStatsContext, ClientStatsProviderWrapper };

import Service from "./index.service";

class ClientService extends Service {
  constructor(urlPrefixe) {
    super();
    this.urlPrefixe = "/api" + urlPrefixe;
  }

  allClients = () => {
    return this.service.get(this.urlPrefixe + "/");
  };
}

const clientService = new ClientService("/clients");

export default clientService;

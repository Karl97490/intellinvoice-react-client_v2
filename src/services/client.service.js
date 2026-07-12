import Service from "./index.service";

class ClientService extends Service {
  constructor(urlPrefixe) {
    super();
    this.urlPrefixe = "/api" + urlPrefixe;
  }

  getAllClients = () => {
    return this.service.get(this.urlPrefixe + "/");
  };

  getClient = (id) => {
    return this.service.get(this.urlPrefixe + `/${id}`);
  };

  createClient = (requestBody) => {
    return this.service.post(this.urlPrefixe + "/", requestBody);
  };

  deleteClient = (id) => {
    return this.service.delete(this.urlPrefixe + `/${id}`);
  };
}

const clientService = new ClientService("/clients");

export default clientService;

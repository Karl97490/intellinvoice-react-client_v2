import Service from "./index.service";

class ClientService extends Service {
  constructor(urlPrefixe) {
    super();
    this.urlPrefixe = "/api" + urlPrefixe;
  }

  getAllClients = (search) => {
    return this.service.get(this.urlPrefixe + "/", { params: { search } });
  };

  getClient = (id) => {
    return this.service.get(this.urlPrefixe + `/${id}`);
  };

  getClientStats = () => {
    return this.service.get(this.urlPrefixe + "/stats");
  };

  createClient = (requestBody) => {
    return this.service.post(this.urlPrefixe + "/", requestBody);
  };

  updateClient = (id, requestBody) => {
    return this.service.put(this.urlPrefixe + `/${id}`, requestBody);
  };

  deleteClient = (id) => {
    return this.service.delete(this.urlPrefixe + `/${id}`);
  };
}

const clientService = new ClientService("/clients");

export default clientService;

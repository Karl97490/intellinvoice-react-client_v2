import Service from "./index.service";

class InvoiceService extends Service {
  constructor(urlPrefixe) {
    super();
    this.urlPrefixe = "/api" + urlPrefixe;
  }

  getAllInvoices = () => {
    return this.service.get(this.urlPrefixe + "/");
  };

  getInvoice = (id) => {
    return this.service.get(this.urlPrefixe + `/${id}`);
  };

  createInvoice = (requestBody) => {
    return this.service.post(this.urlPrefixe + "/", requestBody);
  };

  updateInvoice = (id, requestBody) => {
    return this.service.patch(this.urlPrefixe + `/${id}`, requestBody);
  };
}

const invoiceService = new InvoiceService("/invoices");

export default invoiceService;

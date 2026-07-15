import Service from "./index.service";

class InvoiceService extends Service {
  constructor(urlPrefixe) {
    super();
    this.urlPrefixe = "/api" + urlPrefixe;
  }

  getAllInvoices = (filter) => {
    return this.service.get(this.urlPrefixe + "/", { params: filter });
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

  deleteInvoice = (id) => {
    return this.service.delete(this.urlPrefixe + `/${id}`);
  };
}

const invoiceService = new InvoiceService("/invoices");

export default invoiceService;

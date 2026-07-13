import Service from "./index.service";

class InvoiceService extends Service {
  constructor(urlPrefixe) {
    super();
    this.urlPrefixe = "/api" + urlPrefixe;
  }

  getInvoice = (id) => {
    return this.service.get(this.urlPrefixe + `/${id}`);
  };

  createInvoice = (requestBody) => {
    return this.service.post(this.urlPrefixe + "/", requestBody);
  };
}

const invoiceService = new InvoiceService("/invoices");

export default invoiceService;

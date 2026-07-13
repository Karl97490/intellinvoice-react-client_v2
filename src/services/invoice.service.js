import Service from "./index.service";

class InvoiceService extends Service {
  constructor(urlPrefixe) {
    super();
    this.urlPrefixe = "/api" + urlPrefixe;
  }

  createInvoice = (requestBody) => {
    return this.service.post(this.urlPrefixe + "/", requestBody);
  };
}

const invoiceService = new InvoiceService("/invoices");

export default invoiceService;

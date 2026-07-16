import { createContext, useEffect, useState } from "react";
import invoiceService from "../services/invoice.service";

const InvoiceStatsContext = createContext();

const InvoiceStatsProviderWrapper = (props) => {
  return props.children;
};

export { InvoiceStatsContext, InvoiceStatsProviderWrapper };

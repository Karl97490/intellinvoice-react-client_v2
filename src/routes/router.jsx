import publicRoutes from "./publicRoutes";
import privateRoutes from "./PrivateRoutes";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([...publicRoutes, ...privateRoutes]);

export default router;

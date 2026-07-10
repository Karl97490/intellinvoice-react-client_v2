import publicRoutes from "./publicRoutes";
import privateRoutes from "./privateRoutes";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([...publicRoutes, ...privateRoutes]);

export default router;

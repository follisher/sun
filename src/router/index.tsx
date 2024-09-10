import { createBrowserRouter } from "react-router-dom";
import Aduit from "../pages/aduit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Aduit />,
  },
]);

export default router;

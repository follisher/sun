import { createBrowserRouter } from "react-router-dom";
import Aduit from "../pages/aduit";
import Detail from "../pages/detail";
import { UploadOutlined, VideoCameraOutlined } from "@ant-design/icons";
export const routes = [
  {
    path: "/",
    element: <Aduit />,
    name: "Aduit",
    icon: <UploadOutlined />,
  },
  {
    path: "/detail",
    element: <Detail />,
    name: "Detail",
    icon: <VideoCameraOutlined />,
  },
];
const router = createBrowserRouter(routes);

export default router;

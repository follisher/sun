import { createBrowserRouter } from "react-router-dom";
import Aduit from "../pages/aduit";
import Detail from "../pages/detail";
import { UploadOutlined, VideoCameraOutlined } from "@ant-design/icons";
import Source from "../pages/souce";
export const routes = [
  {
    key: "aduit",
    path: "/",
    element: <Aduit />,
    name: "审核概况",
    icon: <UploadOutlined />,
  },
  {
    key: "detail",
    path: "/detail",
    element: <Detail />,
    name: "审核详情",
    icon: <VideoCameraOutlined />,
  },
  {
    key: "source",
    path: "/source/:id",
    element: <Source />,
    name: "数据修约",
    icon: <VideoCameraOutlined />,
    hideInMenu: true,
  },
];
const router = createBrowserRouter(routes);

export default router;

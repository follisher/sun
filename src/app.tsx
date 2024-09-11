import { Layout, Menu } from "antd";
import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import router, { routes } from "./router";

const { Sider, Content } = Layout;
function App() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onSelect={(item) => {
            router.navigate(routes[+item.key].path);
          }}
          items={routes
            .filter((item) => !item.hideInMenu)
            .map((item, idx) => ({
              key: idx,
              label: item.name,
              icon: item.icon,
              path: item.path,
            }))}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            width: "100%",
            padding: 10,
          }}
        >
          <RouterProvider router={router} />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;

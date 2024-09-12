import { Layout, Menu } from "antd";
import { RouterProvider } from "react-router-dom";
import router, { routes } from "./router";

const { Content, Header } = Layout;
function App() {
  return (
    <Layout>
      <Header>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="horizontal"
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
      </Header>
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

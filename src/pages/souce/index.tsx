import { Layout, Table, Tree } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

function Source() {
  return (
    <Layout>
      <Sider theme="light" collapsible>
        <Tree></Tree>
      </Sider>
      <Layout>
        <Content
          style={{
            width: "100%",
            padding: 10,
          }}
        >
          <Table />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Source;

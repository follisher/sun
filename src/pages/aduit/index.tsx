import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Table, theme } from "antd";
import audit from "../../apis/audit";
import "./index.css";

const { Header, Sider, Content } = Layout;

const Audit: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await audit().list({
        begiontime: "2024-09-02",
        endtime: "2024-09-09",
      });
      if (Array.isArray(data)) {
        setList(data);
      }
    })();
  }, []);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            width: "100%",
          }}
        >
          <Table
            size="small"
            dataSource={list}
            columns={[
              {
                title: "序号",
                dataIndex: "",
              },
              {
                title: "日期",
                dataIndex: "collecttime",
              },
              {
                title: "未审核",
                dataIndex: "wsh",
              },
              {
                title: "待上报",
                dataIndex: "sb",
              },
              {
                title: "复核退回",
                dataIndex: "fhth",
              },
            ]}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Audit;

import { Card, DatePicker, Form, Space, Table, Tree } from "antd";
import { useAuditSource, useCityTree } from "../../hooks/audit";
import { Key, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from 'dayjs'
import { useForm } from "antd/es/form/Form";

function Source() {
  const { citieTree, getCitieTree } = useCityTree();
  const { auditSources, getAuditSource } = useAuditSource();
  const params = useParams<{ id: string }>();
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([params?.id as string]);
  const [form] = useForm()

  useEffect(() => {
    getCitieTree();
  }, []);

  useEffect(() => {
    if (citieTree.length > 0 && params.id) {
      const city = citieTree.find((item) => item.id === params.id);
      if (!city) return;
      getAuditSource({
        begiontime: "2021-01-01",
        stationid: city.id,
        stationname: city.name,
        state: "audit",
        smallstate: 0,
      });
    }
  }, [citieTree]);

  function handlerTreeClick(_: Key[], { node }: { node: cityTreeResult }) {
    getAuditSource({
      begiontime: "2021-01-01",
      stationid: node.id,
      stationname: node.name,
      state: "audit",
      smallstate: 0,
    });
    setSelectedKeys([node.id])
  }

  return (
    <Space align="start">
      <Card>
        <Tree
          onSelect={handlerTreeClick}
          expandedKeys={[
            (citieTree.find((item) => !item.open) as cityTreeResult)?.id,
          ]}
          selectedKeys={selectedKeys}
          treeData={citieTree
            .filter((item) => !item.open)
            .map((item) => {
              return {
                id: item.id,
                key: item.id,
                title: item.name,
                pId: item.pId,
                open: item.open,
                name: item.name,
                children: citieTree
                  .filter((child) => child.pId === item.id)
                  .map((child) => {
                    return {
                      id: child.id,
                      key: child.id,
                      title: child.name,
                      pId: child.pId,
                      open: child.open,
                      name: child.name,
                    };
                  }),
              };
            })}
        />
      </Card>
      <Card>
        <Space direction="vertical">
          <Card>
            <Form form={form}>
              <Form.Item name="cobegiontime">
                <DatePicker />
              </Form.Item>
            </Form>
          </Card>
          <Table key="id" columns={[{
            title: '序号',
            dataIndex: 'key'
          }, {
            title: '时间',
            dataIndex: 'collecttime',
            render(val) {
              return dayjs(val).format('YYYY-MM-DD')
            }
          }, {
            title: 'PM10(μg/m3)',
            dataIndex: 'pm10_val'
          }, {
            title: 'PM2.5(μg/m3)',
            dataIndex: 'pm25_val'
          }, {
            title: 'SO2(μg/m3)',
            dataIndex: 'so2_val'
          }, {
            title: 'NO2(μg/m3)',
            dataIndex: 'no2_val'
          }, {
            title: 'CO(mg/m3)',
            dataIndex: 'co_val'
          }, {
            title: 'O3(μg/m3)',
            dataIndex: 'o3_val'
          }]} dataSource={auditSources.map((item, key) => ({ ...item, key: key + 1 }))} /></Space>
      </Card>
    </Space>
  );
}

export default Source;
